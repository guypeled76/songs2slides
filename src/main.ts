
import pptxgen from "pptxgenjs";

import { 
  scrapeSong 
} from "./scrapers";

import { 
  loadUrls,
  urls 
} from "./input";

import { 
  generateIndex, 
  generateSlides 
} from "./generators";



/*
 * Scrape all the URLs concurrently and get songs data.
 */
loadUrls().then(urls =>
  Promise.all([...new Set(urls)].map(scrapeSong))
)

/*
 * Sort the songs by title. 
 */
.then(songs => songs.sort((a, b) => a.title.localeCompare(b.title)))

/*
 * Create a new Presentation
 */
.then(songs => {
  
  // 1. Create a new Presentation
  let pres = new pptxgen();

  pres.rtlMode = true;

  // Generate index
  generateIndex(pres, songs);

  // Generate slides
  generateSlides(pres, songs);

  // 3. Save the Presentation
  pres.writeFile({
    fileName: "songs.pptx",
  });
});
