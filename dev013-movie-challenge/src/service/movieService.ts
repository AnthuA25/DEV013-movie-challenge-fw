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

export const getMovieDetail = async (id: number): Promise<Movie> => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES&append_to_response=credits`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch movie details for movie ID ${id}`);
    }
    
    const movieData = await response.json();
    const cast = movieData.credits.cast.map((actor: Actor) => ({
        id: actor.id,
        name: actor.name,
        profile_path: actor.profile_path
    }));
    if (movieData.genres) {
        movieData.genre_ids = movieData.genres.map((el: { id: number, name: string }) => el.id);
    }
    console.log("Movie data:", movieData);

    const genres = await getMovieGenres();
    const genresMap = formatGenresToMap(genres);
    console.log("genresMap :",genresMap);


    return {
        ...formatMovie(movieData, genresMap),
        credits: { cast }
    };
}
