"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { P, Small } from "@/components/common/typography";
import { fontMyStyle } from "@/components/common/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { movieSchema } from "@/lib/zod-schemas/movieApiSchema";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useMovieAPI from "@/hooks/useMovieAPI";

export default function UploadMovie(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const { isLoading, error, progressPercent, uploadMovie, removeError } =
    useMovieAPI();
  const form = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      movie: null,
      movieName: "",
    },
  });

  useEffect(() => {
    removeError();
    form.reset();
  }, [open]);

  async function onSubmit(value: z.infer<typeof movieSchema>) {
    const formData = new FormData();
    formData.append("movie", value.movie as File);
    formData.append("movieName", value.movieName);
    console.log(value);
    const ok = await uploadMovie(formData);
    if (ok) {
      setOpen(false);
    }
  }
  return (
    <div className="space-y-4">
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
                <FormLabel>Movie</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Only mp4 videos are allowed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="movie"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movie</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/mp4"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>Only mp4 videos are allowed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} text="Upload" />
          </DialogFooter>
        </form>
      </Form>
      <div className="space-y-2">
        <P
          className={`font-myStyle text-sm font-medium text-right ${fontMyStyle.variable}`}
        >
          {progressPercent}%
        </P>
        <Progress value={progressPercent} />
      </div>
      <ErrorMessage errorMessage={error} />
    </div>
  );
}
