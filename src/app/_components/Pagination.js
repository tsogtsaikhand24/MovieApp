// src/app/_components/Pagination.jsx
"use client";

import React from "react";

export default function Pagination({ current = 1, onChange, total = 20 }) {
  const maxButtons = 7;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxButtons - 1);

  // ensure we show maxButtons when possible
  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="px-3 py-1 border rounded"
          >
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${
            p === current ? "bg-gray-800 text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {end < total && (
        <>
          {end < total - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onChange(total)}
            className="px-3 py-1 border rounded"
          >
            {total}
          </button>
        </>
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current >= total}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
