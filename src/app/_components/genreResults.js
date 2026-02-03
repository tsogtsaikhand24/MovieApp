"use client";
import { useEffect, useState } from "react";
import { GenreSmall } from "./genreSmall";

const apiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const GenreResults = ({ genreName }) => {
  const [genres, setGenres] = useState([]);

  const getGenre = async () => {
    try {
      const data = await fetch(apiLink, options);
      const jsonData = await data.json();
      console.log("API response:", jsonData);
      if (jsonData.genres) {
        setGenres(jsonData.genres);
      } else {
        setGenres([]);
      }
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      setGenres([]);
    }
  };

  useEffect(() => {
    getGenre();
  }, []);

  return (
    <div className="min-h-fit w-fit bg-white  rounded-lg flex flex-col gap-5 dark:bg-black">
      <div>
        <h1 className="font-semibold text-2xl">Genres</h1>
        <p className="text-base font-normal">See lists of movies by genre</p>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <GenreSmall
              buttonText={genre.name}
              key={index}
              genreId={genre.id}
              genreName={genreName}
            />
          ))
        ) : (
          <p className="text-gray-500">Loading genres...</p>
        )}
      </div>
    </div>
  );
};
