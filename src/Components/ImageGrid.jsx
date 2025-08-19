import React from "react";
import ImageCard from "../Components/ImageCard";

export default function ImageGrid({ images = [] }) {
  return (
    <div className="images-grid">
      {images.map((img) => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
}
