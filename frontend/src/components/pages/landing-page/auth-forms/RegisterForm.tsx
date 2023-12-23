"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/zod-schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingButton from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";
import useAuth from "@/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();
  const { isLoading, errorMessage, signedIn } = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const ok = await signedIn(values, "register");

    if (ok) {
      router.refresh();
    }
  }

  function showPasswordToggle() {
    setHidePassword(!hidePassword);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 caret-primary"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@xyz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="john" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={hidePassword ? "password" : "text"}
                  placeholder="password123"
                  {...field}
                />
              </FormControl>
              <FormDescription
                onClick={showPasswordToggle}
                className="w-fit cursor-pointer"
              >
                {hidePassword ? (
                  <span className="flex items-center gap-2">
                    <FaEye /> Show password
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FaEyeSlash /> Hide password
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <LoadingButton text="Register" isLoading={isLoading} />
        </DialogFooter>
        <div>
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      </form>
    </Form>
  );
}
