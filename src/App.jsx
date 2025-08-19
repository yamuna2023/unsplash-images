
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const API_URL = "https://api.unsplash.com";
const IMAGES_PER_PAGE = 20;

function App() {
  const [input, setInput] = useState("nature");
  const [query, setQuery] = useState("nature");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  console.log("Unsplash Access Key:", ACCESS_KEY);

  const api = useMemo(() => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
        "Accept-Version": "v1",
      },
      timeout: 10000,
    });
  }, [ACCESS_KEY]);

  const deriveErrorMessage = (err) => {
    if (!ACCESS_KEY) return " Missing Unsplash access key. Add it to .env file.";
    if (err.response?.data?.errors?.length) return err.response.data.errors[0];
    if (err.response?.status) return `Request failed (${err.response.status}).`;
    return "Network error. Check your internet connection.";
  };

  useEffect(() => {
    let cancelled = false;

    const fetchImages = async () => {
      if (!query?.trim()) {
        setImages([]);
        setTotalPages(0);
        return;
      }

      setErrorMsg("");
      setLoading(true);

      try {
        const { data } = await api.get("/search/photos", {
          params: { query, page, per_page: IMAGES_PER_PAGE },
        });

        if (cancelled) return;

        setImages(data?.results ?? []);
        setTotalPages(Math.max(0, Math.min(data?.total_pages ?? 0, 1000)));
      } catch (err) {
        if (cancelled) return;
        setImages([]);
        setTotalPages(0);
        setErrorMsg(deriveErrorMessage(err));
        console.error("Fetch error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchImages();
    return () => {
      cancelled = true;
    };
  }, [api, page, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = (input || "").trim();
    setPage(1);
    setQuery(next);
  };

  const handleSelection = (topic) => {
    setInput(topic);
    setPage(1);
    setQuery(topic);
  };

  const clearSearch = () => {
    setInput("");
    setQuery("");
    setPage(1);
    setImages([]);
    setTotalPages(0);
    setErrorMsg("");
  };

  return (
    <div className="container">
      <h1 className="title">Image Search</h1>

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <div className="search-section">
        <Form onSubmit={handleSearchSubmit}>
          <div className="d-flex gap-2">
            <Form.Control
              type="search"
              placeholder="Type something to search..."
              className="search-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
            <Button type="button" variant="outline-secondary" onClick={clearSearch}>
              Clear
            </Button>
          </div>
        </Form>
      </div>

      <div className="filters d-flex gap-2 my-3 flex-wrap">
        {["Nature", "Birds", "Cats", "Shoes"].map((topic) => (
          <Button
            key={topic}
            variant="outline-primary"
            size="sm"
            onClick={() => handleSelection(topic.toLowerCase())}
          >
            {topic}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {!errorMsg && images.length === 0 && query && (
            <p className="mt-3">No results found for “{query}”. Try another term.</p>
          )}

          <div className="images">
            {images.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description || "Unsplash image"}
                className="image"
                loading="lazy"
              />
            ))}
          </div>

          <div className="buttons d-flex gap-2 my-3">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages || p + 1, p + 1))}
              disabled={page >= totalPages || loading || !totalPages}
            >
              Next
            </Button>
            {totalPages > 0 && (
              <span className="align-self-center ms-2">
                Page {page} of {totalPages}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
