import scrapeIt from "scrape-it";


// Promise interface
scrapeIt("https://ionicabizau.net", {
    title: ".header h1"
  , desc: ".header h2"
  , avatar: {
        selector: ".header img"
      , attr: "src"
    }
}).then(({ data, status }) => {
    console.log(`Status Code: ${status}`)
    console.log(data)
});