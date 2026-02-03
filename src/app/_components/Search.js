"use client";
import React, { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Star from "../_icons/star";
const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchValue.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(
            searchValue
          )}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);

  return (
    <div className="relative w-[380px]">
      <div className="flex items-center border rounded-md border-gray-300 w-full min-h-8 gap-2 px-2 bg-white">
        <SearchIcon
          size={18}
          className="text-gray-400 bg-[var(--bg)] text-[var(--text)]"
        />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 outline-none   dark:text-gray-900 placeholder:text-gray-900 dark:placeholder:text-gray-900 
          px-3 py-2 rounded-md  bg-[var(--bg)] text-[var(--text)]"
        />
      </div>

      {searchValue && (
        <div className="absolute top-11 left-0 w-full bg-white  border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-[500px] overflow-y-auto">
          {loading ? (
            <p className="p-4 text-sm text-gray-800">Searching...</p>
          ) : results.length > 0 ? (
            <div>
              {results.slice(0, 5).map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : "/no-image.jpg"
                      }
                      alt={movie.title}
                      className="w-[60px] h-[90px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-900 text-sm">
                        {movie.title}
                      </h3>
                      <p className="text-yellow-500 text-xs flex items-center gap-1 flex items-center">
                        <Star /> {movie.vote_average?.toFixed(1)}/10
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {movie.release_date?.slice(0, 4) || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 hover:text-indigo-600 transition">
                    See more →
                  </p>
                </div>
              ))}

              <div
                onClick={() =>
                  router.push(`/search/${encodeURIComponent(searchValue)}`)
                }
                className="p-3 text-center text-sm text-black hover:bg-indigo-50 dark:hover:bg-gray-200 cursor-pointer rounded-b-xl"
              >
                See all results for “{searchValue}”
              </div>
            </div>
          ) : (
            <p className="pl-10 text-sm text-gray-400">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
