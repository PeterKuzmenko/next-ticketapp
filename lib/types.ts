import { User } from "@prisma/client";

export type ClientUser = Omit<User, "password">;
