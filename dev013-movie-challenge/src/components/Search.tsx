import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../styles/Search.css";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); 
    }
    setSearchQuery("");
  };

  return (
    <div className="search-filter">
      <p>Buscar</p>
      <form onSubmit={handleSearch} className="search-input">
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">
          <IoSearchOutline />
        </button>
      </form>
    </div>
  );
};
