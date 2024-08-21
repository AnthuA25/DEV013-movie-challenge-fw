
import { Genre } from '../service/movieService';
import { Movie } from '../model/Movie';
export interface Actor {
    id: number;
    name: string;
    profile_path?: string; 
}

export interface MovieData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    description: string;
}

export const formatMovie = (movieData: MovieData, genreMap?: Map<number, string>):Movie => {
    console.log('name',movieData.title)
    console.log("Movie genre_ids:", movieData.genre_ids);
    console.log("Mapped genres:", movieData.genre_ids ? movieData.genre_ids.map(id => genreMap?.get(id) || 'Unknown'): []);
    
    return {
        id: movieData.id,
        title: movieData.title,
        release_date: movieData.release_date ? movieData.release_date.substring(0, 4) : '',
        poster_path: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
        description: movieData.description,
        overview: movieData.overview,
        backdrop_path: `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`,
        popularity:movieData.popularity,
        genres: movieData.genre_ids ? movieData.genre_ids.map(id => genreMap?.get(id) || 'Unknown') : [],
    }
}

export const formatGenresToMap = (genres: Genre[]) => {
    const genreMap = new Map<number, string>(
        genres.map(({ id, name }) => [id, name])
    );
    return genreMap;
}

interface Option {
    value: string;
    label: string;
}
export const formatGenresToOptions = (genres: Genre[]): Option[] => {
    return genres.map((genre) => ({
        value: genre.id.toString(),
        label: genre.name
    }));
}
