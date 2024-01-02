import MovieCard from "@/components/pages/movie-page/MovieCard";

export default function MoviesPage(): React.ReactElement {
  return (
    <main className="flex-grow my-4 space-y-2 section">
      <div>{"4"}/20</div>
      <section>
        <MovieCard />
      </section>
    </main>
  );
}
