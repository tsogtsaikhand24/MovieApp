"use client";

import React from "react";
import { Footer } from "./_features/Footer";
import { Header } from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { MovieList } from "./_features/home/MovieList";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <MovieList type="Upcoming Movielist" />

      <Footer />
    </div>
  );
}
