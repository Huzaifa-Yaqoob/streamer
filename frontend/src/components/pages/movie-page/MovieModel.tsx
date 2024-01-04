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
      <DialogTrigger asChild>
        <MovieCard movie={movie} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.movieDisplayName}</DialogTitle>
        </DialogHeader>
        <AspectRatio ratio={16 / 9} className="bg-accent"></AspectRatio>
      </DialogContent>
    </Dialog>
  );
}
