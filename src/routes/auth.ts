import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import auth from "../middleware/authMiddleware";
import { createToken } from "../utils/token";

const prisma = new PrismaClient();
const router = Router();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = schema.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      res.status(400).json({ error: "Email déjà utilisé" });
      return;
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const token = createToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ error: "Champs invalides" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = schema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }
    const token = createToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ error: "Erreur d'entrée" });
  }
});

router.get("/me", auth, async (req: Request, res: Response): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: (req as any).user.id } });
  res.json({ id: user?.id, email: user?.email });
});

export default router;
