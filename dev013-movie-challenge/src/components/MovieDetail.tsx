import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../model/Movie";
import { getMovieDetail, Actor } from '../service/movieService';
import "../styles/MovieDetail.css";


export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [actors, setActors] = useState<Actor[]>([]);
  //   const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const movieDetail = await getMovieDetail(parseInt(id as string));
        console.log("Movie Detail:", movieDetail); 
        setMovie(movieDetail);
        setActors(movieDetail.credits?.cast || []);
        // setActors(movieDetail.credits.cast);
        setError(false);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  return (
    <div
      className="movie-detail-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
      }}
    >
      {isLoading && <p className="loading">Cargando...</p>}
      {error && (
        <p className="error">
          Error al obtener los detalles de la película. Vuelva a intentarlo más tarde.
        </p>
      )}
      {!isLoading && !error && (
        <article className="movie-detail-content">
          <div className="movie-poster">
            <img
              className="img-movie-detail"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-info">
            <h1 className="movie-title-detail">{movie.title}</h1>
            <div className="movie-genres">
              {movie.genres.length > 0 ? (
                movie.genres.map((genre, index) => (
                  <div key={index} className="genre">
                    {genre}
                  </div>
                ))
              ) : (
                <p>No hay géneros disponibles</p>
              )}
            </div>
            <p data-testid="movie-overview">{movie.overview || ""}</p>
            <div className="actors">
              <h4>Actor</h4>
              <ul>
                {actors.slice(0, 5).map((actor) => (
                  <li key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="actor-image"
                    />
                    {actor.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
