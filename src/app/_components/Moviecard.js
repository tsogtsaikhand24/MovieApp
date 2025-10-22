"use client";
import React from "react";

export const MovieCard = ({ title, rating, image }) => {
  return (
    <div className="flex flex-col w-[250px] h-[439px] bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
      <img src={image} alt={title} className="w-full h-[340px] object-cover" />
      <div className="p-0">
        <p className="text-yellow-600 text-sm mt-1">⭐ {rating}/10</p>
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};
