"use client";
import React, { useState } from "react";
import VideoModal from "./Videomodal";
import Star from "../_icons/star";
import BigStar from "../_icons/BigStar";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Card1({ movie }) {
  const [open, setOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleWatchTrailer = async () => {
    try {
      setLoadingTrailer(true);
      const res = await fetch(`${BASE_URL}/movie/${movie.id}/videos`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });
      const data = await res.json();

      const trailer = data.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setOpen(true);
      } else {
        alert("🎞 This movie has no trailer available.");
      }
    } catch (err) {
      console.error("Trailer fetch error:", err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <>
      <div
        className="relative w-full h-[600px] rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

        <div className="absolute bottom-16 left-16 max-w-xl text-white space-y-4">
          <h1 className="text-4xl font-bold drop-shadow-lg">{movie.title}</h1>
          <p className="text-yellow-400 text-lg flex items-center gap-1">
            <BigStar /> {movie.vote_average?.toFixed(1)} / 10
          </p>
          <p className="text-sm text-gray-200 line-clamp-3">
            {movie.overview || "No description available."}
          </p>

          <button
            onClick={handleWatchTrailer}
            disabled={loadingTrailer}
            className="mt-4 px-5 py-2 bg-white text-black rounded-md hover:bg-gray-300 transition cursor-pointer"
          >
            {loadingTrailer ? "Loading..." : "▶ Watch Trailer"}
          </button>
        </div>
      </div>

      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        trailerUrl={
          trailerKey
            ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1`
            : ""
        }
      />
    </>
  );
}
