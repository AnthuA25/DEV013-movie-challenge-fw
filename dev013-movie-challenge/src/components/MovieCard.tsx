import { Movie } from "../model/Movie";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../assets/default-movie.jpg";


interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <div onClick={handleClick} className="movie-card">
      <img src={movie.poster_path.includes("null") || movie.poster_path.includes("undefined") ? defaultPoster : movie.poster_path} alt={movie.title}/>
      <div className="movie-info">
        <h3>{movie.title || 'Título no disponible'}</h3>
      </div>
      <p>{movie.release_year || '-'}</p>
    </div>
  );
};
