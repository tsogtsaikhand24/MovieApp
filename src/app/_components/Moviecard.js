"use client";
import React from "react";
import Link from "next/link";

export const MovieCard = ({ id, title, rating, image }) => {
  return (
    <Link href={`/movie/${id}`} className="block">
      <div className="flex flex-col w-[250px] h-[439px] bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-[340px] object-cover"
        />
        <div className="p-3">
          <p className="text-yellow-600 text-sm mt-1">⭐ {rating}/10</p>
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
