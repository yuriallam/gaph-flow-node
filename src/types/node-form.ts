import { z } from "zod";
import { HabitOptions } from "./habit-node";

export const nodeSchema = z
  .object({
    nodeName: z
      .string()
      .min(3, "Node name must be at least 3 characters")
      .max(20, "Node name must be at most 20 characters"),
    username: z.preprocess(
      (val) => (!!val ? val : undefined),
      z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters")
        .optional()
    ),
    habit: z.preprocess(
      (val) => (!!val ? val : undefined),
      z.nativeEnum(HabitOptions).optional()
    ),
  })
  .refine(
    (data) => {
      return data.username || data.habit;
    },
    {
      message: "Either username or habit is required",
    }
  );

export type NodeFormData = z.infer<typeof nodeSchema>;
