"use client";

import { useState, useEffect } from "react";
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
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/common/buttons";
import ErrorMessage from "@/components/common/error-display";
import useVideoAPI from "@/hooks/useVideoAPI";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadVideo(): React.ReactElement {
  return <div></div>;
}
