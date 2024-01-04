import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headerForJSON } from "@/lib/axios";
import MovieModel from "@/components/pages/movie-page/MovieModel";

export type UserMovies = {
  _id: string;
  movieName: string;
  movieDisplayName: string;
};

export default async function MoviesPage(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions);
  const data = (await getUserMovies(
    session?.user.token as string
  )) as UserMovies[];

  if (!data) {
    return <p>error</p>;
  }

  return (
    <main className="flex-grow my-4 space-y-2 section">
      <div>{data.length as number}/20</div>
      <section className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((movie, index) => (
          <MovieModel key={index} movie={movie} />
        ))}
      </section>
    </main>
  );
}

// function to fetch data of user movies
async function getUserMovies(token: string): Promise<UserMovies[] | boolean> {
  try {
    headerForJSON.authorization = token;
    const res = await fetch("http://localhost:3300/user-movies", {
      method: "GET",
      headers: headerForJSON,
      next: { tags: ["movies-collection"] },
    });
    if (!res.ok) {
      return false;
    }
    const data = await res.json();
    return data as UserMovies[];
  } catch (error) {
    console.log(error);
    return false;
  }
}
