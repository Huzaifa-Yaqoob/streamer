"use client";

import { useState, useEffect } from "react";
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
  FormDescription,
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
import { avatarSchema } from "@/lib/zod-schemas/updateUserInfoSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChangeAvatar from "@/hooks/useChangeAvatar";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";

export default function ChangeAvatar() {
  const {
    isLoading,
    error,
    RisLoading,
    removeError,
    changeAvatar,
    removeAvatar,
  } = useChangeAvatar();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      avatar: null,
    },
  });

  useEffect(() => {
    removeError();
    form.reset();
  }, [open]);

  async function onSubmit(value: z.infer<typeof avatarSchema>) {
    const formData = new FormData();
    formData.append("avatar", value.avatar as File);
    const ok = await changeAvatar(formData);
    if (ok) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-xs bg-accent p-2 rounded-full">
        <FaPen />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Your Avatar</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 caret-primary"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/jpeg, image/jpg, image/png"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Only jpeg, jpg andd png images are allowed.
                  </FormDescription>
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
              <LoadingButton
                isLoading={RisLoading}
                text="Remove"
                variant={"secondary"}
                type="button"
                onClick={async () => {
                  const ok = await removeAvatar();
                  if (ok) {
                    setOpen(false);
                  }
                }}
              />
              <LoadingButton isLoading={isLoading} text="Update" />
            </DialogFooter>
          </form>
        </Form>
        <ErrorMessage errorMessage={error} />
      </DialogContent>
    </Dialog>
  );
}
