import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  games: z.array(z.string()).optional(),
  profile_pic: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(255).optional(),
  games: z.array(z.string()).optional(),
  profile_pic: z.string().optional(),
});
