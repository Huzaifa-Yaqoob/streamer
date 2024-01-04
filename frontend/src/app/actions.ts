"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateMovies() {
  revalidateTag("movies-collection");
}
