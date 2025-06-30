import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export function createToken(user: User) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}
