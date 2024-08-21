import { Movie } from "../model/Movie";
import { MovieCard } from "./MovieCard";

interface MovieListProps{
    movies:Movie[]
}

export const MovieList = ({movies}:MovieListProps) => {
  return (
    <div className="movie-list">
    {movies.map(movie => (
      <MovieCard 
        key={movie.id}
        movie={movie}
      />
    ))}
  </div>
  )
}
