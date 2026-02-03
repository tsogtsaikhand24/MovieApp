import { Header } from "@/app/_features/Header";
import { Footer } from "@/app/_features/Footer";
import MovieDetail from "./MovieDetail";

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <Header />
      <MovieDetail />
      <Footer />
    </div>
  );
}
