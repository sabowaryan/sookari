import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token manquant" });
    return; // Important : stop execution, don’t return the response itself
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore or use declaration merging for req.user
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token invalide" });
    return;
  }
}
