"use client";

import React, { useEffect, useState } from "react";
import { MovieCard } from "../../_components/MovieCard";
import { SeeMoreIcon } from "@/app/_icons/Moviezicon"; // эсвэл өөр icon чинь энд
// ↑ энэ icon-ийн нэрийг өөрийн төслөөс шалгаарай

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const PopularMovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setMovieData(data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("page running once");
    getData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 pt-[52px]">
      {/* Хэсгийн гарчиг ба See more товч */}
      <div className="w-[1277px] h-[36px] flex justify-between items-center">
        <p className="font-semibold text-2xl leading-[32px] tracking-[-0.6px] text-[#09090B]">
          Popular
        </p>
        <button className="flex items-center gap-2 px-4">
          <p className="text-sm font-medium text-[#09090B]">See more</p>
        </button>
      </div>

      {/* Кино жагсаалт */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 px-[32px]">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
