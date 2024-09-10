import { useState } from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";
import "../styles/Filters.css";
import { Search } from "./Search";
import { formatGenresToOptions } from "../utils/transformers";

interface FilterProps {
  genres: { id: number; name: string }[];
  onFilterChange: (genreId: number | null, sortBy: string | null) => void;
  onSearch: (query: string) => void;
  onReset: () => void;
}

export const Filters = ({ genres, onFilterChange,onSearch,onReset }: FilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isExpanded] = useState<boolean>(false);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value ? parseInt(event.target.value) : null;
    setSelectedGenre(genreId);
    onFilterChange(genreId, sortBy);
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    setSortBy(sortOption);
    onFilterChange(selectedGenre, sortOption); 
  };
  
  const handleReset = () => {
    setSelectedGenre(null);
    setSortBy(null);
    onReset(); 
  };

  const genreOptions = formatGenresToOptions(genres);
  const displayedGenres = isExpanded ? genreOptions : genreOptions.slice(0, 5);
  return (
    <>
      <div className="title-top">
        <BiSolidMoviePlay className="icon-top" />
        <h1 className="title">Peliculas</h1>
      </div>
      <div className="filter-container">
        <div className="categories">
        {displayedGenres.map((option) => (
            <h3
              key={option.value}
              className={`filter-op`}
              onClick={() => 
                handleGenreChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>)}
            >
              {option.label}
            </h3>
          ))}
        </div>
        <div className="filters" onClick={toggleFilters}>
          <h3 className="filter-op">Filtros</h3>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {isOpen && (
        <div className="filter-dropdown">
          <Search onSearch={onSearch} />
          <div className="filters__option">
            <label>Género</label>
            <div className="filters__select">
              <select onChange={handleGenreChange} value={selectedGenre ?? ""}>
                <option value="">-------</option>
                {genreOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="filters__option">
            <label>Ordenar por</label>
            <div className="filters__select">
              <select onChange={handleSortChange} value={sortBy ?? ""}>
                <option value="">-------</option>
                <option value="popularity.desc">Más populares</option>
                <option value="popularity.asc">Menos populares</option>
                <option value="release_date.desc">Más recientes</option>
                <option value="release_date.asc">Más antiguos</option>
              </select>
            </div>
          </div>
          <button className="reset-filters" onClick={handleReset}>
            <FaArrowsRotate />
          </button>
        </div>
      )}
    </>
  );
};
