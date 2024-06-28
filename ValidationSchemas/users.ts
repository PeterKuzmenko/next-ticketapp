import { z } from "zod";
import { $Enums } from ".prisma/client";
import Role = $Enums.Role;

export const userSchema = z.object({
  name: z.string().min(3, "Name should be at least 6 characters").max(255),
  username: z
    .string()
    .min(3, "Username should be at least 6 characters")
    .max(255),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.enum(Object.values(Role)),
});
