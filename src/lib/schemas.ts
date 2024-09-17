import { z } from "zod";

const login = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Must be at least 10 characters"),
});

const register = z
  .object({
    username: z.string().min(1).max(30),
    email: z.string().email(),
    password: z.string().min(10, "Must be at least 10 characters"),
    validatePassword: z
      .string()
      .min(10, "Password must be at least 10 characters"),
  })
  .refine((data) => data.password === data.validatePassword, {
    message: "Password must match",
    path: ["validatePassword"],
  });

const reset = z.object({
  email: z.string().email(),
});

const verification = z.object({
  code: z.string().max(10),
});

export const LoginFormSchemas = { login, register, reset, verification };
