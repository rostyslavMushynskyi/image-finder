import { BiSearch } from "react-icons/bi";
import { useState } from "react";

function SearchBar({ onSearch, value }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch(query);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <BiSearch fontSize={20} />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="Off"
          autoFocus
          value={value}
          placeholder="Search images and photos"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

export default SearchBar;
