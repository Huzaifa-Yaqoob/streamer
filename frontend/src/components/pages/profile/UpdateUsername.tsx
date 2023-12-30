"use client";

import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { usernameSchema } from "@/lib/zod-schemas/updateUserInfoSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUpdateUsername from "@/hooks/useUpdateUsername";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";

interface UpdateUsernameProps {
  username: string;
}

export default function UpdateUsername({ username }: UpdateUsernameProps) {
  const [open, setOpen] = useState(false);
  const { isLoading, error, updateUsername, removeError } = useUpdateUsername();
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof usernameSchema>) {
    console.log(values);
    const ok = await updateUsername(values);
    if (ok) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-xs">
        <FaPen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Your Username</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 caret-primary"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={username} {...field} />
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
              <LoadingButton isLoading={isLoading} text="Update" />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
