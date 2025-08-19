

import React from "react";
import ImageCard from "../Components/ImageCard";

export default function ImageGrid({ images = [], loading = false, error = null }) {
  if (!loading && !error && images.length === 0) {
    return <p className="text-danger">No images found.</p>;
  }

  return (
    <div className="images-grid">
      {images.map((img) => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
}
