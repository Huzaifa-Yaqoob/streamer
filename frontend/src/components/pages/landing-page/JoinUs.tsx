"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { H4, Small } from "@/components/common/typography";
import LoginForm from "./auth-forms/LoginForm";
import RegisterForm from "./auth-forms/RegisterForm";

export default function JoinUs() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const data = {
    heading: showLoginForm ? "Log In" : "Register",
    small: showLoginForm
      ? "Do not have an account?"
      : "Already have an account?",
    button: showLoginForm ? "Register." : "Login.",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-8 active:scale-90 transition-transform">
          <H4>Join Us</H4>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-4xl" asChild>
            <H4>{data.heading}</H4>
          </DialogTitle>
        </DialogHeader>
        {showLoginForm ? <LoginForm /> : <RegisterForm />}
        <Small className="font-normal">
          {data.small}
          <Button
            variant={"link"}
            className="p-0 m-0 ml-1 font-bold"
            onClick={() => setShowLoginForm(!showLoginForm)}
          >
            {data.button}
          </Button>
        </Small>
      </DialogContent>
    </Dialog>
  );
}
