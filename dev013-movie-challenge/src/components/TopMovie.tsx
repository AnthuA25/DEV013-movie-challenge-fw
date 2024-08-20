import { useEffect, useState } from "react";
import { Movie } from "../model/Movie";
import "../styles/TopMovie.css";

export const TopMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);


  return (
    <>
      
    </>
  );
};
