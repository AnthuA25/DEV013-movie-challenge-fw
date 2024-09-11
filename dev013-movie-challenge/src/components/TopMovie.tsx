import { useEffect, useState } from "react";
import { getTopMovie } from "../service/APIService";
import { BiSolidMoviePlay, } from "react-icons/bi";
import { Movie } from "../model/Movie";
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import "../styles/TopMovie.css";

export const TopMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getTopMovie();
        // Filtrar las 10 películas más populares
        const topMovies = allMovies.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
        setMovies(topMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  
  const handleNext = () => {
    if (currentIndex < movies.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (movies.length === 0) return <div>No movies found</div>;
  return (
    <>
      <div className="title-top">
        <BiSolidMoviePlay className="icon-top" />
        <h1 className="title">Top Movie</h1>
      </div>
      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && currentIndex > 0 && (
          <div className="arrow left-arrow" onClick={handlePrev}>
            <IoIosArrowBack />
          </div>
        )}
        <div className="movie-list">
          {movies.slice(currentIndex, currentIndex + 3).map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster_path} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
              </div>
              <p>{movie.release_year}</p>
            </div>
          ))}
        </div>
        {isHovered && currentIndex < movies.length - 5 && (
          <div className="arrow right-arrow" onClick={handleNext}>
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </>
  );
};
