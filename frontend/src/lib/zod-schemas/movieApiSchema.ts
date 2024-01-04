import * as z from "zod";

export const movieSchema = z.object({
  movie: z
    .instanceof(File)
    .nullable()
    .refine((value) => value !== null, {
      message: "Video is required.",
    })
    .refine((value) => value?.type === "video/mp4", {
      message: "Only mp4 video is allowed.",
    }),
  movieName: z.string().min(1).max(25),
});

export const renameMovieSchema = z.object({
  movieName: z.string().min(1).max(25),
});
