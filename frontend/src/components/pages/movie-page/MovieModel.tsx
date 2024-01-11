"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MovieCard from "./MovieCard";
import { type UserMovies } from "@/app/user/movies/page";

interface MovieModelProps {
  movie: UserMovies;
}

export default function MovieModel({ movie }: MovieModelProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="active:scale-95 transition-transform">
        <div>
          <MovieCard movie={movie} />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.movieDisplayName}</DialogTitle>
        </DialogHeader>
        <AspectRatio ratio={16 / 9} className="bg-accent">
          <video
            className="w-full h-full object-contain"
            controls
            src={`http://localhost:3300/uploads/private/${movie.movieName}`}
          ></video>
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
}
