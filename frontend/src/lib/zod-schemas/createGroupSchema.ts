import { z } from "zod";

export const createGroupSchema = z.object({
  groupName: z.string().min(4).max(32),
});
