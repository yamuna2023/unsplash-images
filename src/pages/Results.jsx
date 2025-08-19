import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchImages from "../hooks/useFetchImages";
import ImageGrid from "../Components/ImageGrid";
import Loading from "../Components/Loading";
import SearchBar from "../Components/SearchBar";

function useQueryParams() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Results() {
  const params = useQueryParams();
  const navigate = useNavigate();

  const q = params.get("q") || "";
  const page = parseInt(params.get("page") || "1", 10);

  const { images, totalPages, loading, error } = useFetchImages(q, page, 12);

  const goToPage = (p) => {
    navigate(`/search?q=${encodeURIComponent(q)}&page=${p}`);
  };

  return (
    <div className="container">
      <h1 className="title">Results</h1>

      <SearchBar initialValue={q} onSearch={(term) => navigate(`/search?q=${encodeURIComponent(term)}&page=1`)} />

      {loading && <Loading />}

      {error && <p className="error-msg">{error}</p>}

      {!loading && !error && images.length === 0 && <p>No images found.</p>}

      <ImageGrid images={images} />

      {!loading && images.length > 0 && (
        <div className="d-flex gap-2 my-3 flex-wrap">
          <button className="btn btn-outline-primary" onClick={() => goToPage(Math.max(1, page - 1))} disabled={page <= 1}>
            Previous
          </button>
          <button className="btn btn-outline-primary" onClick={() => goToPage(Math.min(totalPages || page + 1, page + 1))} disabled={page >= totalPages || totalPages === 0}>
            Next
          </button>
          <div className="align-self-center ms-2">Page {page} of {totalPages || "?"}</div>
        </div>
      )}
    </div>
  );
}
