"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";
import useMovieAPI from "@/hooks/useMovieAPI";
import { renameMovieSchema } from "@/lib/zod-schemas/movieApiSchema";
import revalidateMovies from "@/app/actions";

interface RemoveMovieProps {
  id: string;
  movieDisplayName: string;
}

export default function UpdateMovieName({
  id,
  movieDisplayName,
}: RemoveMovieProps) {
  const [open, setOpen] = useState(false);
  const {
    renameMovie,
    RError: error,
    RisLoading: isLoading,
    removeError,
  } = useMovieAPI();
  const form = useForm<z.infer<typeof renameMovieSchema>>({
    resolver: zodResolver(renameMovieSchema),
    defaultValues: {
      movieName: movieDisplayName,
    },
  });

  async function onSubmit(values: z.infer<typeof renameMovieSchema>) {
    console.log(values);
    if (values.movieName === movieDisplayName) {
      return;
    }
    const ok = await renameMovie(id, values);
    if (ok) {
      setOpen(false);
      revalidateMovies();
    }
  }
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="text-lg">
            <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename this movie</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 caret-primary"
            >
              <FormField
                control={form.control}
                name="movieName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={"movie name"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ErrorMessage errorMessage={error} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => {
                      removeError();
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <LoadingButton isLoading={isLoading} text="Rename" />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
