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

interface namedUrl {
    name: string;
    url: string;
}