import scrapeIt from "scrape-it";
import pptxgen from "pptxgenjs";


interface Song {
  url: string;
  title: string;
  artist: string;
  words: string[];
  music: string[];
  lines: string[];
}

/*
 * The URLs we want to scrape.
 */
let urls = [
  "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=6948",
  "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=821",
  "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=202&wrkid=2473"
];

/*
 * Scrape all the URLs concurrently and get songs data.
 */
let songs = Promise.all(
  urls.map(url => {

    // Log the URL we are scraping
    console.log(`Scraping ${url}`);

    // Scrape the URL
    let song = scrapeIt<Song>(url, {
      url: {
        selector: "body@url",
        convert: x => url
      },
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
    });

    // Return the song
    return song;

  })
).then(
  songs => songs.map(song => song.data)
).then(songs => {
  
  // 1. Create a new Presentation
  let pres = new pptxgen();

  // 2. Loop through the songs
  for(let song of songs){

    // Log the song we are adding
    console.log(`Adding ${song.url}`);

    // 2.1. Add a Slide
    let slide = pres.addSlide();

    // 2.2. Add the song title
    slide.addText(`${song.title}`, { 
      x: 0.5,
      y: 0.5, 
      w: "90%",
      color: "363636", 
      fontSize: 16,
      align: "right",
      margin: 0.5
    });

    // 2.3. Add the song artist
    slide.addText(`${song.artist}`, { 
      x: 0.5,
      y: 1, 
      w: "90%",
      color: "363636", 
      fontSize: 13,
      align: "right",
      margin: 0.5
    });

    // 2.4. Add the song lines
    slide.addText(song.lines.join("\n"), {
      x: 0.5,
      y: 1.5,
      w: "90%",
      h: "80%",
      margin: 0.5,
      fontFace: "Arial",
      fontSize: 12,
      color: "000000",
      isTextBox: true,
      valign: "top",
      align: "right"
  });
  }

  // 3. Save the Presentation
  pres.writeFile({
    fileName: "test.pptx",
  });
});
