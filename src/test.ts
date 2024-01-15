import scrapeIt from "scrape-it";


// Promise interface
scrapeIt("https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=6948", {
    title: "h1.artist_song_name_txt", 
    artist: "a.artist_singer_title",
    words:{
      listItem: "td > b:nth-of-type(1) > a.artist_normal_txt_black"
    },
    music:{
      listItem: "td > b:nth-of-type(2) > a.artist_normal_txt_black"
    },
    lines: {
      selector: "span.artist_lyrics_text",
      how: "text",
      convert: x => x.split("\n")
    }
}).then(({ data, status }) => {
    console.log(`Status Code: ${status}`)
    console.log(data)
});