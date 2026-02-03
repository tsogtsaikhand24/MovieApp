import { Footer } from "../_features/Footer";
import { Header } from "../_features/Header";
import { MovieList } from "./_features/movieList";

export default function UpcomingPage() {
  return (
    <div className="flex flex-col gap-12 w-full min-h-screen max-2xl:gap-8 max-md:gap-6 max-sm:gap-3 dark:bg-black">
      <Header />
      <MovieList SectionTitle={"Upcoming"} />
      <Footer />
    </div>
  );
}
