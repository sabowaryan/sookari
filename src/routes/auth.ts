import { Router } from "express";
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

router.post("/register", async (req, res) => {
  try {
    const { email, password } = schema.parse(req.body);
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "Email déjà utilisé" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    const token = createToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ error: "Champs invalides" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = schema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }
    const token = createToken(user);
    res.json({ token });
  } catch {
    res.status(400).json({ error: "Erreur d'entrée" });
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({ id: user?.id, email: user?.email });
});

export default router;
