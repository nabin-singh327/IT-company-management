import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/courses?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <form
        onSubmit={handleSearch}
        className="-mt-7 relative z-10 bg-white rounded-lg shadow-lg border border-ink/5 flex items-center p-2 max-w-xl"
      >
        <span className="font-mono text-teal pl-3 pr-1 text-sm">$</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search --course python"
          className="flex-1 px-2 py-2 outline-none text-sm font-mono text-ink placeholder:text-ink/30"
        />
        <button
          type="submit"
          className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy/90 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;