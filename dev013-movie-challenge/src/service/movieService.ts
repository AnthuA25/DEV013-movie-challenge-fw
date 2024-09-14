import { Movie } from '../model/Movie';
import { apiKey } from "../modules/Api";
import { formatGenresToMap, formatMovie } from "../utils/transformers";


export interface Genre {
    id: number;
    name: string;
}
export interface Actor {
    id: number;
    name: string;
    profile_path: string | null;
}

export const getMovieGenres = async (): Promise<Genre[]> => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=es-ES`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch movie genres');
    }
    const data = await response.json();
    return data.genres;

}
