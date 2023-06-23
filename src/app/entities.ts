export interface baseResponse<T> {
    info: {
        count: number;
        next: string;
        prev: string;
        pages: number;
    },
    results: T[];
}

export interface character {
    id: number;
    created: string;
    episode: string[];
    gender: string;
    image: string;
    location: namedUrl;
    name: string;
    origin: namedUrl;
    species: string;
    status: string;
    type: string;
    url: string;
}

export interface episode {
    id: number; //	The id of the episode.
    name: string; // The name of the episode.
    air_date: string; // The air date of the episode.
    episode: string; //	The code of the episode.
    characters: string[]; // List of characters who have been seen in the episode.
    url: string; // (url) Link to the episode's own endpoint.
    created: string; //	Time at which the episode was created in the database.  
}

interface namedUrl {
    name: string;
    url: string;
}