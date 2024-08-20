import { apiKey} from "../modules/Api";
import { Movie } from "../model/Movie";
import { formatMovie, MovieData } from "../utils/transformers";


export const getNowPlaying = async (): Promise<Movie[]> => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1`, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  const movies = data.results;
  movies.sort((a: Movie, b: Movie) => b.popularity - a.popularity);
  return movies.slice(0, 3);
};


export const getTopMovie = async (): Promise<Movie[]> => {
  const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?language=es-ES`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
  });

  if (!resp.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await resp.json();
  const movies = data.results.map((movie:MovieData) => formatMovie(movie));
  return movies;
}



