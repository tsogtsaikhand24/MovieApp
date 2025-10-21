"use client";

import Image from "next/image";
import React from "react";

export const MovieCard = ({ movie }) => {
  const imageBase = "https://image.tmdb.org/t/p/w500";

  // Хэрвээ зураг байхгүй бол fallback зураг ашиглах
  const posterSrc = movie.poster_path
    ? `${imageBase}${movie.poster_path}`
    : "/no-image.png"; // public/no-image.png байрлуулж болно

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 cursor-pointer overflow-hidden">
      {/* Зураг */}
      <div className="relative w-full h-[300px]">
        <Image
          src={posterSrc}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-cover"
        />
      </div>

      {/* Киноны мэдээлэл */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
          {movie.title || "Untitled"}
        </h3>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1">⭐</span>
          <span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
          <span className="ml-1 text-gray-400">/10</span>
        </div>
      </div>
    </div>
  );
};
