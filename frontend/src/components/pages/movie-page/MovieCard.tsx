import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RenameMovie from "./actions/RenameMovie";
import RemoveMovie from "./actions/RemoveMovie";
import { UserMovies } from "@/app/user/movies/page";

interface MovieCardProps {
  movie: UserMovies;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.movieDisplayName}</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="bg-accent"></AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-row-reverse gap-4">
        <RemoveMovie id={movie._id} />
        <RenameMovie id={movie._id} movieDisplayName={movie.movieDisplayName} />
      </CardFooter>
    </Card>
  );
}
