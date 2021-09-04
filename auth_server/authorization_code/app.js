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
const path = require('path')
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const { Cluster } = require('puppeteer-cluster');
const cluster = require('cluster')
const os = require('os')
const childProcess = require('child_process')
require('dotenv').config()
// {path:__dirname+'/./../../.env'}

var port = process.env.PORT || 8888
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret

var redirect_uri = process.env.REACT_APP_BACK_END_URL + "/callback/"

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

// check if the process is the master process
if (false) {
  // get the number of available cpu cores 
  const nCPUs = os.cpus().length;
  console.log(nCPUs)
  // fork worker processes for each available CPU core

  for(let i = 0; i< nCPUs; i++){
      cluster.fork()
  }
} else{
    var app = express();

    app
      .use(express.static(__dirname + "/../../public/"))
      .use(cors())
      .use(cookieParser())
      .use(bodyParser.json());

    app.get("/", (req, res) => {
      res.sendFile(path.resolve(__dirname,'../../public/index.html'))
    })

    ;(async () => {
      var options = {
        args: [
            '--autoplay-policy=user-gesture-required',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-update',
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-domain-reliability',
            '--disable-extensions',
            '--disable-features=AudioServiceOutOfProcess',
            '--disable-hang-monitor',
            '--disable-ipc-flooding-protection',
            '--disable-notifications',
            '--disable-offer-store-unmasked-wallet-cards',
            '--disable-popup-blocking',
            '--disable-print-preview',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-setuid-sandbox',
            '--disable-speech-api',
            '--disable-sync',
            '--hide-scrollbars',
            '--ignore-gpu-blacklist',
            '--metrics-recording-only',
            '--no-default-browser-check',
            '--no-first-run',
            '--no-pings',
            '--no-sandbox',
            '--no-zygote',
            '--password-store=basic',
            '--use-gl=swiftshader',
            '--use-mock-keychain'
        ],
        headless: true,
      }


      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 10,
        retryLimit: 2,
        puppeteerOptions: options,
      })

      await cluster.task(async ({page, data}) => {
        const { lyric_IDs, query_IDs } = data
        page.goto(data.url);
        await page.waitForSelector('#video-title')
        var [el] = await page.$x('//*[@id="video-title"]')
        var href = await el.getProperty('href')
        var hreftext = await href.jsonValue();
        var youtube_id = hreftext.split("?v=")[1]
        if (lyric_IDs) {
          lyric_IDs[data.index] = youtube_id
          return lyric_IDs
        }
        else {
          query_IDs[data.index] = youtube_id;
          return query_IDs
        }
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
              console.log(body.display_name, body.email);
            });
            
            // we can also pass the token to the browser to make requests from there
            res.redirect(
              process.env.REACT_APP_FRONT_END_URL.concat("/modes?") +
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

    
    app.post("/youtube_search",  async (req, res) => {
        var {tracks, query_IDs, lyric_IDs} = req.body

        // for (let i = 0; i < tracks.length; i++ ) {
        //   const { query_index } = tracks[i]
        //   const base = tracks[i].track_name.split(" ").join("+").replace(/&/g, "+")
        //   const query = base + "+video"
        //   const lyric = base + "+lyrics"
        //   const data = { query_index }
          // data.queryURL = query_IDs[query_index] ?  "https://www.youtube.com/results?search_query=" + query : null
          // data.lyricURL = lyric_IDs[query_index] ?  "https://www.youtube.com/results?search_query=" + lyric : null
          // cluster.execute({data}
        // }



        const { query_index } = tracks[0]
        const base = tracks[0].track_name.split(" ").join("+").replace(/&/g, "+")
        const query = base + "+video"
        const lyric = base + "+lyrics"

        const lyricIDs =  await cluster.execute({
          url: "https://www.youtube.com/results?search_query=" + lyric, 
          index: query_index,
          lyric: true,
          lyric_IDs
        })
        const queryIDs = await cluster.execute({
          url: "https://www.youtube.com/results?search_query=" + query, 
          index: query_index,
          lyric: false,
          query_IDs
        })

        res.send({query_IDs: queryIDs, lyric_IDs: lyricIDs}) 
    })
        
    //     const forked_child_process = childProcess.fork('./auth_server/authorization_code/getYouTubeIDs.js')
    //     forked_child_process.on("message", message => res.send(message));
    //     forked_child_process.send({ tracks, query_IDs, lyric_IDs});
    // })
      
      
    app.get('*',  (req, res) =>  {
      res.sendFile(path.join(__dirname, "..", "..", "spotify", "build", "index.html"))
    })
      
    
    app.listen(port);
    console.log("Listening on " + port );
  })();
}
    
