"use client";
import React from "react";
import Link from "next/link";
import Star from "../_icons/star";

export const MovieCard = ({ id, title, rating, image }) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-[280px] bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-[380px] object-cover"
        />
        <div className="p-3 bg-[#F4F4F5] h-[100px]">
          <p className="text-yellow-600 text-sm mt-1 flex items-center gap-1">
            <Star /> {rating}/10
          </p>
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};
