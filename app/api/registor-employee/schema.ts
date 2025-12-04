import z from "zod";

export const createEmployeSchema = z.object({
  name: z.string(),
  email: z.email(),
  age: z.number(),
  role: z.string(),
  salary: z.number(),
});
