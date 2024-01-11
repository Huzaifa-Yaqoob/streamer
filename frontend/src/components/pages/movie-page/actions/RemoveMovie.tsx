"use client";

import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/common/Spinner";
import useMovieAPI from "@/hooks/useMovieAPI";
import revalidateMovies from "@/app/actions";
import { toast } from "sonner";

interface RemoveMovieProps {
  id: string;
}

export default function RemoveMovie({ id }: RemoveMovieProps) {
  const { RMisLoading: isLoading, RMError: error, removeMovie } = useMovieAPI();
  const handleRemoveClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const ok = await removeMovie(id);
    if (ok) {
      console.log("as");
      revalidateMovies();
    }
  };

  if (error !== "") {
    toast(error);
  }

  return (
    <Button
      variant={"destructive"}
      className="text-lg"
      onClick={handleRemoveClick}
    >
      {isLoading ? <Spinner /> : <FaTrashCan />}
    </Button>
  );
}
