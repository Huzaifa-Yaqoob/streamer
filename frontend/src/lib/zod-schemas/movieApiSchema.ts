import * as z from "zod";

export const movieSchema = z.object({
  movie: z.any(),
});
