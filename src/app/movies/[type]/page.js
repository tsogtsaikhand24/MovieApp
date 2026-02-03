"use client";

import { Header } from "../../_features/Header";
import { Footer } from "../../_features/Footer";
import { useParams } from "next/navigation";
import { LoadingMovieList } from "@/app/_features/skeletons/LoadingMovieList";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, BASE_URL } from "@/app/_constants";
import MoviesPage from "@/app/_components/MoviesPage";

export default function Page() {
  const [moviesTypeData, setMoviesTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const param = useParams();

  const moviesTypeDataList = async () => {
    setLoading(true);
    const moviesTypeEndpoint = `${BASE_URL}/movie/${param.type}?language=en-US&page=${page}`;
    const moviesTypeResponse = await fetch(moviesTypeEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await moviesTypeResponse.json();
    setMoviesTypeData(data.results);
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    moviesTypeDataList();
  }, [page]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Header />
        <LoadingMovieList />
        <Footer />
      </div>
    );
  }
  return (
    <MoviesPage
      data={moviesTypeData}
      page={page}
      setPage={setPage}
      param={param}
    />
  );
}
