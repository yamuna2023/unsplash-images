
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import ImageGrid from "../Components/ImageGrid";

export default function Home() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // current page
  const perPage = 12;

  const onSearch = (term) => {
    navigate(`/search?q=${encodeURIComponent(term)}&page=1`);
  };

  const fetchImages = async (pageNumber) => {
    try {
      setLoading(true);
      setError(null);

      const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      const response = await fetch(
        `https://api.unsplash.com/photos?per_page=${perPage}&page=${pageNumber}&client_id=${accessKey}`
      );

      if (!response.ok) throw new Error("Failed to load images");

      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <h1 className="title">Unsplash Image Search</h1>
      <p className="subtitle">Search for images (shows 12 results per page)</p>

      <SearchBar initialValue="" onSearch={onSearch} />

      {loading && <p>Loading trending images...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && images.length > 0 && (
        <>
          <ImageGrid images={images} />

          <div className="d-flex gap-2 my-3 flex-wrap">
            <button
              
              onClick={handlePrev}
              disabled={page === 1}
              className="btn btn-outline-primary"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="btn btn-outline-primary"
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && !error && images.length === 0 && (
        <p className="text-danger">No images found.</p>
      )}
    </div>
  );
}
