import csvParse from "csv-parse";
import { fs } from "file-system-cache/lib/common";
/*
 * The URLs we want to scrape.
 */
export const urls = [
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
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=547&wrkid=925",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=617&wrkid=2143",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=618&wrkid=3097",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=316&wrkid=171",
    "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=341&wrkid=1027",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=342&wrkid=6081",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=975&wrkid=3168",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=34&wrkid=120",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=34&wrkid=1264",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=2100&wrkid=2062",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=820&wrkid=2982",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=843&wrkid=1872",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=342&wrkid=179",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=827&wrkid=5777",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=125&wrkid=3447",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=960&wrkid=2091",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=517&wrkid=2070",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=517&wrkid=2686",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=517&wrkid=13123",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=4734&wrkid=3481",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=712&wrkid=1957",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=6262&wrkid=1688",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=606&wrkid=3917",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=305&wrkid=1869",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=110&wrkid=2069",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=409&wrkid=796",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=34&wrkid=850",
   "https://shironet.mako.co.il/artist?type=lyrics&lang=1&prfid=34&wrkid=2126"
];

export async function loadUrls() {
    let songUrls = [];
    console.log(`Loading songs from csv file.`);
    await csvParse.parse(fs.readFileSync("songs.csv")).forEach((line) => {
        for (let i = 0; i < line.length; i++) {
            let songUrl = line[i].trim();
            if (songUrl.startsWith("https://shironet.")) {
                console.log(`Loading ${songUrl} from csv file.`);
                songUrls.push(songUrl);
            }
        }
    });
    console.log(`Loaded ${songUrls.length} songs from csv file.`);
    return songUrls;
}