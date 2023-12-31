import * as z from "zod";

export const usernameSchema = z.object({
  username: z.string().min(3).max(24),
});

const MAX_FILE_SIZE = 1 * 1024 * 1024; //1mb max file size

export const avatarSchema = z.object({
  avatar: z
    .instanceof(File)
    .nullable()
    .refine((value) => value !== null, {
      message: "Image is required.",
    })
    .refine(
      (value) =>
        value?.type === "image/png" ||
        value?.type === "image/jpg" ||
        value?.type === "image/jpeg",
      {
        message: "Only png, jpg and jpeg image is allowed.",
      }
    )
    .refine(
      (value) => {
        if (value?.size) {
          return value?.size <= MAX_FILE_SIZE;
        }
        return false;
      },
      {
        message: "file size is larger then 1Mb",
      }
    ),
});
