import { useEffect, useState } from "react";
import { Movie } from "../model/Movie";
import { getNowPlaying} from "../service/APIService";
import "../styles/CarruselMovie.css";

export const CarruselMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getNowPlaying();
        console.log("Fetched Movies:", moviesData);
        setMovies(moviesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 10000); 

      return () => clearInterval(interval); 
    }
  }, [movies]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      {movies.length > 0 && (
        <div className="carousel-item">
          <div className="image-container">
            <img
              className="main-image"
              src={`https://image.tmdb.org/t/p/w1280${movies[currentIndex].backdrop_path}`}
              alt={movies[currentIndex].title}
            />
          </div>
          <div className="overlay">
            <div>
              <h2 className="movie-title">{movies[currentIndex].title}</h2>
              <p className="movie-description">
                {movies[currentIndex].overview}
              </p>
              <div className="button-see">
                <button>Ver más</button>
              </div>
            </div>
            <div className="related-images">
              <img
                src={`https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path}`}
                alt={`${movies[currentIndex].title} related`}
              />
              <img
                src={`https://image.tmdb.org/t/p/w780${movies[currentIndex].backdrop_path}`}
                alt={`${movies[currentIndex].title} related`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
