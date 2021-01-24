/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const puppeteer = require('puppeteer')
const { Cluster } = require('puppeteer-cluster');

var port = process.env.PORT || 8888
var client_id = "f5015c8336214507b109279c338a098e"; // Your client id
var client_secret = "dd067e38447f41a99d31021e5b4f5941"; // Your secret
var redirect_uri = "https://peaceful-caverns-22670.herokuapp.com/callback/"
//var redirect_uri = "http://localhost:" + port + "/callback/"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/../../spotify/build"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = "user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-recently-played";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        show_dialog: true,
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "https://peaceful-caverns-22670.herokuapp.com/modes" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});


app.post("/youtube_search",  (req, res) => {
  (async function(){
    // Settings to make puppeteer faster
    const options = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',// <- this one doesn't works in Windows
        '--disable-gpu'
      ],
      headless: true
    }

    // Launch concurrent puppeteer
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 10,
      retryLimit: 3,
    });
    var query_IDs = req.body.query_IDs
    var lyric_IDs = req.body.lyric_IDs

    await cluster.task(async ({ page, data}) => {
      await page.goto(data.url);
      await page.waitForSelector('#video-title')
      var [el] = await page.$x('//*[@id="video-title"]')
      var href = await el.getProperty('href')
      var hreftext = await href.jsonValue();
      var youtube_id = hreftext.split("?v=")[1]
      console.log(youtube_id)

      if (data.lyric === false) {
        query_IDs[data.index] = youtube_id;
      }
      else {
        lyric_IDs[data.index] = youtube_id;
      }
        
      console.log(youtube_id)
    })

    var i = 0, len = req.body.search_terms.length;
    while (i < len) {
      base = req.body.search_terms[i][0].split(" ").join("+").replace(/&/g, "+")
      query = base + "+official+video"
      lyric = base + "+lyric+video"
      if (query_IDs[req.body.search_terms[i][2]] === 0) {
        cluster.queue({
          url: "https://www.youtube.com/results?search_query=" + query, 
          index: req.body.search_terms[i][2],
          lyric: false
        })
      }
      if (lyric_IDs[req.body.search_terms[i][2]] === 0) {
        cluster.queue({
          url: "https://www.youtube.com/results?search_query=" + lyric, 
          index: req.body.search_terms[i][2],
          lyric: true
        })
      }
      i++
    }
    
    await cluster.idle();
    console.log(query_IDs)
    res.send(
      { query_IDs: query_IDs,
        lyric_IDs: lyric_IDs,
      });
    await cluster.close();
  })()
})

app.listen(port);
console.log("Listening on " + port );

