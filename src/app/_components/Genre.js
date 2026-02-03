"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export const Genre = () => {
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: "application/json",
          },
        });
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreClick = (genre) => {
    router.push(`/genre/${genre.id}`);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-700transition cursor-pointer"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        Genre
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-[520px] bg-white border border-gray-200 rounded-xl shadow-lg p-5 z-50"
          >
            <h3 className="text-lg font-semibold mb-1">Genres</h3>
            <p className="text-sm text-gray-500 mb-4">
              See lists of movies by genre
            </p>

            {loading ? (
              <p className="text-sm text-gray-400 italic">Loading genres...</p>
            ) : genres.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre)}
                    className="text-sm flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full hover:bg-indigo-50 hover:border-indigo-100 cursor-pointer transition"
                  >
                    {genre.name}
                    <span className="text-gray-400">›</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No genres found.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
