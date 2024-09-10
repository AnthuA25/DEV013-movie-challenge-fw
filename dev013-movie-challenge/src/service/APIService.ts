import { apiKey} from "../modules/Api";
import { Movie } from "../model/Movie";
import { formatMovie, MovieData } from "../utils/transformers";

interface Filters {
  page?: number;
  genreId?: number | null;
  sortBy?: string | null;
  searchQuery?:string;
}
export interface Results {
  metaData: {
    pagination: {
      currentPage: number;
      totalPages: number;   
    };
  };
  movies: Movie[];
}

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

export const getMovie = async (filters:Filters,genres: Map<number, string>): Promise<Results> => {
  const filter = filters.genreId ? `&with_genres=${filters.genreId}` : "";
  const sort = filters.sortBy ? `&sort_by=${filters.sortBy}` : "";
  const search = filters.searchQuery ? `&query=${filters.searchQuery}` : "";
  const url =`https://api.themoviedb.org/3/discover/movie?language=es-ES&page=${filters.page}${filter}${sort}${search}`;
  const resp = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
  });
  if (!resp.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await resp.json(); 
  const movies = data.results.map((movie: MovieData) => formatMovie(movie, genres));
  const result = {
    metaData: {
      pagination: {
        currentPage: data.page,
        totalPages: data.total_pages,
      },
    },
    movies,
  };
  return result;
}
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



