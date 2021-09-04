const puppeteer = require('puppeteer')
const { Cluster } = require('puppeteer-cluster');

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
        '--use-mock-keychain',
        '--user-data-dir'
    ],
    headless: true,
    userDataDir: './puppeteer-cache'
  }

process.on("message", async(message) => {
    let ids = await getYouTubeID(message);
    // send the results back to the parent process
    process.send(ids);
    // kill the child process
    process.exit();
})


async function getYouTubeID(req){

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 2,
        retryLimit: 2,
        puppeteerOptions: options,
    })

      let { query_IDs, lyric_IDs, tracks } = req
    

      //Look for IDs in current index of list
      await cluster.task(async ({page, data}) => {

        page.goto(data.url);
        await page.waitForSelector('#video-title')
        var [el] = await page.$x('//*[@id="video-title"]')
        var href = await el.getProperty('href')
        var hreftext = await href.jsonValue();
        var youtube_id = hreftext.split("?v=")[1]
        data.lyric ? lyric_IDs[data.index] = youtube_id : query_IDs[data.index] = youtube_id;
          
      })
  
      // Load up the cluster
      for (let i = 0; i < tracks.length; i++ ) {
        const { query_index } = tracks[i]
        const base = tracks[i].track_name.split(" ").join("+").replace(/&/g, "+")
        const query = base + "+video"
        const lyric = base + "+lyrics"
        if (!query_IDs[query_index]) {
          cluster.queue({
            url: "https://www.youtube.com/results?search_query=" + query, 
            index: query_index,
            lyric: false,
          })
        }
        if (!lyric_IDs[query_index]) {
          cluster.queue({
            url: "https://www.youtube.com/results?search_query=" + lyric, 
            index: query_index,
            lyric: true
          })
        }
        i++
      }
      try {
          return { query_IDs, lyric_IDs };
    } finally {
        await cluster.idle()
      }
      

}