import { Footer } from "./_features/Footer";
import { Header } from "./_features/Header";
import { HeroSection } from "./_features/heroSection";
import { PopularMovieList } from "./_features/PopularMovieList";
import { TopRatedMovieList } from "./_features/topRatedMovieList";
import { UpcomingMovieList } from "./_features/UpcomingMovielist";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 w-full min-h-screen max-2xl:gap-8 max-md:gap-6 max-sm:gap-3 dark:bg-black">
      <Header />
      <HeroSection />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRatedMovieList />
      <Footer />
    </div>
  );
}
