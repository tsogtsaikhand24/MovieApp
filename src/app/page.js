import { Header } from "./_features/Header";
import { HeroSection } from "./_features/home/HeroSection";
import { Footer } from "./_features/Footer";
import { MovieList } from "./_features/home/MovieList";

export default function Home() {
  return (
    <div className="flex flex-col items-center box-border">
      <Header />
      <HeroSection />
      <MovieList type="upcoming" title="Upcoming" />
      <MovieList type="popular" title="Popular" />
      <MovieList type="top_rated" title="Top Rated" />
      <Footer />
    </div>
  );
}
