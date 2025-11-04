// src/app/upcoming/page.jsx
"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MovieGrid } from "@/app/_features/home/MovieGrid"; // таны real path-ийг тавиарай
import Pagination from "../_components/Pagination";
import { Header } from "../Header";
// эсвэл: import MovieGrid from '@/app/_features/home/MovieGrid';

export default function UpcomingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // page query-г унших — default 1
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const onChangePage = (newPage) => {
    // router.push нь client-side navigation хийнэ
    // query-г сольж өгнө — back/forward ажиллана
    router.push(`/upcoming?page=${newPage}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Upcoming Movies</h1>

      {/* reuse MovieGrid — указать fetchPath и page */}
      <MovieGrid
        fetchPath="/movie/upcoming"
        page={currentPage}
        initialCount={10}
      />

      {/* Pagination (дараах кодыг доор үзүүлнэ) */}
      <div className="mt-8 flex justify-center">
        <Pagination current={currentPage} onChange={onChangePage} />
      </div>
    </div>
  );
}
