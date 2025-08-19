import { useState, useEffect, useContext } from "react";
import { UnsplashContext } from "../context/UnsplashContext";


export default function useFetchImages(query, page = 1, perPage = 12) {
  const { accessKey } = useContext(UnsplashContext);

  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${accessKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        setImages(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("API error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page, perPage, accessKey]);

  return { images, totalPages, loading, error };
}


