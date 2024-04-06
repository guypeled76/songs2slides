import pptxgen from "pptxgenjs";
import { 
    IndexTitle, 
    TitleStyle, 
    IndexTableStyle,
    SubtitleStyle,
    TableStyle,
    linesPerColumn,
} from "./styles";

import { 
    Song 
} from "./models";


/*
 * Generate a PowerPoint presentation from a list of songs
 */
export function generateIndex(pres: pptxgen, songs: Song[]) {
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

    const cell : pptxgen.TableCell = {
        text: song.title.replace(/(.{15})..+/, "$1…"),
        options: {
          hyperlink: {
            slide: slide,
          }
        }
      };

    indexRow.push(cell);

    slide++;
  }

  while(indexRow.length < 5) indexRow.push({text: ""});

  // 2.4.1. Add the song lines
  indexSlide.addTable(indexRows, IndexTableStyle);
}

/*
 * Generate a PowerPoint presentation from a list of songs
 */
export function generateSlides(pres: pptxgen, songs: Song[]) {
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

        slide.addNotes(`${song.notes.join("\n")}`);

        slide.addText("אינדקס", {
            x: 0.5,
            y: 0.5,
            w: 2,
            fontFace: "Arial",
            hyperlink: {
                slide: 1,
            }
        })

        let blocks = [];

        // 2.4. Add the song line blockes
        for (let i = 0; i < song.lines.length; i += linesPerColumn) {
            console.log(`Adding lines ${i} to ${i + linesPerColumn}`);
            blocks.push(song.lines.slice(i, i + linesPerColumn).join("\n").trim());      
        }
        
        // 2.4.1. Add the song lines
        slide.addTable([blocks.reverse()], TableStyle);
    }
}