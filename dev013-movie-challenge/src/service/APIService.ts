import { apiKey} from "../modules/Api";
import { Movie } from "../model/Movie";



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





