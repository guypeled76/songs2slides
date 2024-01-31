export interface Song extends Notes {
    url: string;
    title: string;
    artist: string;
    words: string[];
    music: string[];
    lines: string[];
}

export interface Notes {
    notes: string[];
}