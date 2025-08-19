import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";

export default function Home() {
  const navigate = useNavigate();

  const onSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}&page=1`);
  };

  return (
    <div className="container">
      <h1 className="title">Unsplash Image Search</h1>
      <p className="subtitle">Search for images (shows 12 results per page)</p>
      <SearchBar initialValue="nature" onSearch={onSearch} />
    </div>
  );
}
