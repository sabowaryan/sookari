import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("✅ Sookari Backend is running!");
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
