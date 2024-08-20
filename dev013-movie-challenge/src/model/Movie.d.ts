export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path:string;
    description: string;
    genres: string[];
    overview: string;
    release_date:string;
    popularity: number;
    credits?: {
        cast: {
            id: number;
            name: string;
            profile_path: string;
        }[];
    };
}
  