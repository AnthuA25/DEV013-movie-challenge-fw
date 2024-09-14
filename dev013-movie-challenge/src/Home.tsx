import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CarruselMovie } from "./components/CarruselMovie";
import { TopMovie } from "./components/TopMovie";
import { Filters } from "./components/Filters";
import { MovieList } from "./components/MovieList";
import { Movie } from "./model/Movie";
import { getMovie } from "./service/APIService";
import { Pagination } from "./components/Pagination";
import { formatGenresToMap } from "./utils/transformers";
import { getMovieGenres } from "./service/movieService";
import "./Home.css";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [genreMap, setGenreMap] = useState<Map<number, string>>(new Map());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedGenre = parseInt(searchParams.get("genre") || "0");
  const sortBy = searchParams.get("sort") || null;
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    setCurrentPage(page);
    const queryParam = searchParams.get("query") || "";
    // if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
    // }
  }, [searchParams, page]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getMovie({ page: currentPage, genreId: selectedGenre, sortBy: sortBy, searchQuery: searchQuery},genreMap);
        setMovies(allMovies.movies);
        setTotalPages(Math.min(allMovies.metaData.pagination.totalPages,100));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage,selectedGenre,sortBy,genreMap,searchQuery]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getMovieGenres();
        setGenres(genreData);
        const newGenreMap = formatGenresToMap(genreData);
        setGenreMap(newGenreMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const updateUrlParams = (params: { [key: string]: string }) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    }

    setSearchParams(currentParams);
  };

  const handleFilterChange = (genreId: number | null, sortBy: string | null) => {
    updateUrlParams({
      page: "1",
      genre: genreId ? genreId.toString() : "",
      sort: sortBy || "",
      query: searchQuery
    });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({
      page: page.toString(),
      genre: selectedGenre ? selectedGenre.toString() : "",
      sort: sortBy || "",
      query: searchQuery
    });
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  
    updateUrlParams({
      page: "1",
      genre: selectedGenre ? selectedGenre.toString() : "",
      sort: sortBy || "",
      query: query
    });
  };

  const resetFilters = () => {
    updateUrlParams({
      page: "1",
      genre: "",
      sort: "",
      query: ""
    });
  };
  return (
    <>
      <header className="headerMovie">
        <div className="titleMovie">
          <h4>WatchMovie</h4>
        </div>
        <div className="NavBar">
          <CarruselMovie />
        </div>
      </header>
      <main className="main">
        <TopMovie />
        <Filters genres={genres} onFilterChange={handleFilterChange} onSearch={handleSearch}  onReset={resetFilters}/>
        <MovieList movies={movies} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </main>
    </>
  );
}

export default Home;
