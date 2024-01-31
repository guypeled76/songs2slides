import scrapeIt from "scrape-it";
import Cache from 'file-system-cache';
import { Notes, Song } from "./models";

const cache = Cache({
    basePath: "./.cache", // (optional) Path where cache files are stored (default).
    ns: "v1",   // (optional) A grouping namespace for items.
    hash: "sha1"          // (optional) A hashing algorithm used within the cache key.
  });

export function scrapeSong(url: string): Promise<Song> {

    return cache
    
        // Try to get the song from the cache
        .get(url, null)

        // If the song is not in the cache, scrape the URL
        .then(data => {

            // Return the cached song
            if (data != null) {
                
                // Log the URL we are return the cached song for
                console.log(`Found cached ${url}`);

                return data as Song;
            }

            // Log the URL we are scraping
            console.log(`Scraping ${url}`);

            // Scrape the URL
            return scrapeShironet(url)
            
            // Cache the song and return it
            .then(song => {  
                cache.set(url, song);
                return song;
            });
        });
}

function scrapeShironet(url: string): Promise<Song> {
    return scrapeShironetSong(url)
    
    .then(song => {
        
        // Scrape the notes
        return scrapeShironetNotes(url)
        
        // Add the notes to the song
        .then(notes => {
            if (notes && notes.notes) {

                // Log the URL we are scraping
                console.log(`Found chords ${url}`);

                song.notes = notes.notes;
            }
            return song;
        });
    
    });
}

function scrapeShironetSong(url: string): Promise<Song> {
    const urlObject = new URL(url);
    urlObject.searchParams.set("type", "lyrics");
    return scrapeIt<Song>(urlObject.toString(), {
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
    })
    
    // Return the song data
    .then(song => song.data);
}

function scrapeShironetNotes(url: string): Promise<Notes> {
    const urlObject = new URL(url);
    urlObject.searchParams.set("type", "chords");
    return scrapeIt<Notes>(urlObject.toString(), {
        notes: {
            selector: "span.artist_lyrics_text",
            how: "text",
            convert: x => x.split("\n")
        }
    })
    
    // Return the song data
    .then(song => song.data);
}