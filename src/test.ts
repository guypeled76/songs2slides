import scrapeIt from "scrape-it";
import pptxgen from "pptxgenjs";


interface Song {
  title: string;
  artist: string;
  words: string[];
  music: string[];
  lines: string[];
}

// Promise interface
scrapeIt<Song>("https://shironet.mako.co.il/artist?type=chords&lang=1&prfid=960&wrkid=6948", {
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

   

    // 1. Create a new Presentation
    let pres = new pptxgen();

    // 2. Add a Slide
    let slide = pres.addSlide();

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    slide.addText(`${data.title}`, { x: 1, y: 1, color: "363636" });

    // 4. Save the Presentation
    pres.writeFile({
      fileName: "test.pptx",
    });
});