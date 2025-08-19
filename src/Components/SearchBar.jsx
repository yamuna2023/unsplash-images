import React, { useState } from "react";

export default function SearchBar({ initialValue = "", onSearch }) {
  const [term, setTerm] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    const t = (term || "").trim();
    if (!t) return;
    onSearch(t);
  };

  return (
    <form onSubmit={submit} className="mb-3">
      <div className="d-flex gap-2">
        <input
          className="form-control"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search images..."
          aria-label="Search images"
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>
    </form>
  );
}
