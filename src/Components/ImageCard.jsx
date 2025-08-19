import React from "react";

export default function ImageCard({ image }) {
  if (!image) return null;

  const thumb = image.urls?.small;
  const full = image.urls?.full || image.urls?.raw;

  const alt = image.alt_description || image.description || "Unsplash image";

  return (
    <div className="image-card">
      <a href={full} target="_blank" rel="noopener noreferrer" title="Open full resolution in new tab">
        <img src={thumb} alt={alt} loading="lazy" />
      </a>
      <div className="image-meta">
        <small>By {image.user?.name || "Unknown"}</small>
      </div>
    </div>
  );
}
