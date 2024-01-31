import scrapeIt from "scrape-it";
import pptxgen from "pptxgenjs";
import { 
  TitleStyle, 
  SubtitleStyle, 
  TableStyle, 
  IndexTableStyle,
  linesPerColumn,
  IndexTitle
} from "./styles";

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
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=162&wrkid=2824",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=547&wrkid=2942",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=169&wrkid=322",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=563&wrkid=1152",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=462&wrkid=465",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=400",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=162&wrkid=612",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=162&wrkid=622",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=1943&wrkid=1340",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=183&wrkid=1132",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=405&wrkid=1146",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=162&wrkid=1299",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=339&wrkid=1386",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=2723&wrkid=2998",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=1780",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=3049&wrkid=1790",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=778&wrkid=2282",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=605&wrkid=2345",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=202&wrkid=2473",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=308&wrkid=917",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=459&wrkid=2635",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=2679",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=563&wrkid=2348",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=1333&wrkid=22224",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=688&wrkid=173",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=688&wrkid=2012",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=563&wrkid=813",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=688&wrkid=2140",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=462&wrkid=3252",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=1125",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=975&wrkid=1835",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=2421",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=166&wrkid=1626",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=157&wrkid=2590",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=862&wrkid=8862",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=1261&wrkid=4444",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=547&wrkid=2702",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=688&wrkid=2292",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=268&wrkid=2328",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=688&wrkid=2221",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=169&wrkid=2910",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=578&wrkid=3064",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=429&wrkid=1284",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=85&wrkid=1351",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=563&wrkid=1059",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=606&wrkid=1308",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=547&wrkid=1904",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=39",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=975&wrkid=464",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=107&wrkid=3685",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=187&wrkid=1537",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=110&wrkid=2330",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=301&wrkid=2261",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=686&wrkid=78",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=575&wrkid=3185",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=916&wrkid=2303",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=57&wrkid=2073",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=3391",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=110&wrkid=2139",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=712&wrkid=358",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=686&wrkid=142",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=489&wrkid=4614",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=268&wrkid=1121",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=547&wrkid=925"
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

  /*
   * Sort the songs by title. 
   */
  songs => songs
    .map(song => song.data)
    .sort((a, b) => a.title.localeCompare(b.title))

).then(songs => {
  
  // 1. Create a new Presentation
  let pres = new pptxgen();

  // 1.1. Add an index slide
  let indexSlide = pres.addSlide();

  // 2.2. Add the song title
  indexSlide.addText(IndexTitle, TitleStyle);

  let indexRows : pptxgen.TableRow[] = [];

  let indexRow : pptxgen.TableRow= [];
  indexRows.push(indexRow);
  let slide = 2;

  // 1.1. Loop through the songs
  for(let song of songs){
    if (indexRow.length == 5){
      indexRow = [];
      indexRows.push(indexRow);
    }

    indexRow.push({
      text: song.title,
      options: {
        hyperlink: {
          slide: slide,
        }
      }
    });

    slide++;
  }

  // 2.4.1. Add the song lines
  indexSlide.addTable(indexRows, IndexTableStyle);

  // 2. Loop through the songs
  for(let song of songs){

    // Log the song we are adding
    console.log(`Adding ${song.url}`);

    // 2.1. Add a Slide
    let slide = pres.addSlide();

    // 2.2. Add the song title
    slide.addText(`${song.title}`, TitleStyle);

    // 2.3. Add the song artist
    slide.addText(`${song.artist}`, SubtitleStyle);

    slide.addText("index", {
      x: 0.5,
      y: 0.5,
      hyperlink: {
        slide: 1,
      }
    })

    let blocks = [];

    // 2.4. Add the song line blockes
    for (let i = 0; i < song.lines.length; i += linesPerColumn) {
      console.log(`Adding lines ${i} to ${i + linesPerColumn - 1}`);
      blocks.push(song.lines.slice(i, i + linesPerColumn - 1).join("\n"));      
    }
    
    // 2.4.1. Add the song lines
    slide.addTable([blocks.reverse()], TableStyle);
  }

  // 3. Save the Presentation
  pres.writeFile({
    fileName: "test.pptx",
  });
});
