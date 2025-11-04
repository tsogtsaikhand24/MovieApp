"use client";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

function fetchWithAuth(url) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }).then((r) => {
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return r.json();
  });
}

export default function Test123({ params }) {
  const movieId = params?.movieId || 550;

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  // For genres -> related movies
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);

  // For trailer
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setError(null);
    setMovie(null);

    fetchWithAuth(
      `${BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits`
    )
      .then((data) => setMovie(data))
      .catch((e) => setError(e.message));
  }, [movieId]);

  // fetch related movies by genre id
  const handleGenreClick = async (genreId) => {
    if (!genreId) return;
    setSelectedGenreId(genreId);
    setRelatedLoading(true);
    setRelatedError(null);
    setRelatedMovies([]);
    try {
      const url = `${BASE_URL}/discover/movie?language=en-US&with_genres=${genreId}&sort_by=popularity.desc`;
      const data = await fetchWithAuth(url);
      setRelatedMovies(data.results || []);
    } catch (e) {
      setRelatedError(e.message);
    } finally {
      setRelatedLoading(false);
    }
  };

  // fetch trailer on demand
  const handlePlayTrailer = async () => {
    setTrailerLoading(true);
    setTrailerError(null);
    setTrailerKey(null);
    try {
      const data = await fetchWithAuth(
        `${BASE_URL}/movie/${movieId}/videos?language=en-US`
      );
      const videos = data.results || [];
      // find YouTube trailer first
      const trailer =
        videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        videos.find((v) => v.site === "YouTube");
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        setTrailerError("No YouTube trailer found.");
      }
    } catch (e) {
      setTrailerError(e.message);
    } finally {
      setTrailerLoading(false);
    }
  };

  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!movie) return <p className="p-4">Loading movie...</p>;

  const directors =
    movie.credits?.crew
      ?.filter((c) => c.job === "Director")
      .map((c) => c.name)
      .join(", ") || "—";
  const writers =
    movie.credits?.crew
      ?.filter((c) => ["Screenplay", "Writer", "Story"].includes(c.job))
      ?.map((c) => c.name)
      ?.join(", ") || "—";
  const stars =
    movie.credits?.cast
      ?.slice(0, 5)
      ?.map((c) => c.name)
      ?.join(", ") || "—";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: poster + genres */}
        <div className="w-full md:w-1/3">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow"
            />
          ) : (
            <div className="w-full h-[420px] bg-gray-200 rounded-lg flex items-center justify-center">
              No poster
            </div>
          )}

          {/* Genres under poster */}
          <div className="mt-3 flex flex-wrap gap-2">
            {(movie.genres || []).map((g) => (
              <button
                key={g.id}
                onClick={() => handleGenreClick(g.id)}
                className={`px-3 py-1 rounded-full border text-sm hover:bg-gray-100 ${
                  selectedGenreId === g.id ? "bg-gray-200" : ""
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {movie.release_date} •{" "}
            {movie.runtime ? `${movie.runtime} min` : "—"} •{" "}
            {(movie.genres || []).map((g) => g.name).join(", ")}
          </p>

          <p className="mt-2 text-yellow-600 font-semibold">
            ⭐ {movie.vote_average ?? "N/A"}/10
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Overview</h3>
            <p className="text-sm text-gray-800 mt-1">
              {movie.overview || "No description."}
            </p>
          </div>

          <div className="mt-4">
            <p>
              <span className="font-semibold">Director:</span> {directors}
            </p>
            <p>
              <span className="font-semibold">Writers:</span> {writers}
            </p>
            <p>
              <span className="font-semibold">Stars:</span> {stars}
            </p>
          </div>

          <div className="mt-4 flex gap-3 items-center">
            <button
              onClick={handlePlayTrailer}
              className="px-4 py-2 bg-red-500 text-white rounded"
              disabled={trailerLoading}
            >
              {trailerLoading ? "Loading..." : "Play Trailer"}
            </button>

            {trailerError && (
              <div className="text-sm text-red-500">{trailerError}</div>
            )}
          </div>

          {/* Trailer iframe */}
          {showTrailer && trailerKey && (
            <div className="mt-4">
              <div className="aspect-video w-full">
                <iframe
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              </div>
              <button
                onClick={() => setShowTrailer(false)}
                className="mt-2 text-sm text-gray-600 underline"
              >
                Close trailer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related movies section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          {selectedGenreId
            ? "Related movies"
            : "Select a genre to see related movies"}
        </h2>

        {relatedLoading && <p className="mt-2">Loading related movies...</p>}
        {relatedError && <p className="mt-2 text-red-500">{relatedError}</p>}

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedMovies.map((m) => (
            <a
              key={m.id}
              href={`/movie/${m.id}`}
              className="block bg-white rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
            >
              {m.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                  alt={m.title}
                  className="w-full h-[220px] object-cover"
                />
              ) : (
                <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center">
                  No poster
                </div>
              )}
              <div className="p-2">
                <p className="text-sm font-medium truncate">{m.title}</p>
                <p className="text-xs text-gray-500">{m.release_date}</p>
              </div>
            </a>
          ))}
        </div>

        {selectedGenreId && relatedMovies.length === 0 && !relatedLoading && (
          <p className="mt-2 text-sm text-gray-600">
            No movies found for this genre.
          </p>
        )}
      </div>
    </div>
  );
}
