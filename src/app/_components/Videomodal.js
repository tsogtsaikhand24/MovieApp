"use client";
import React from "react";

export default function VideoModal({ isOpen, onClose, trailerUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-[900px] h-[500px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
