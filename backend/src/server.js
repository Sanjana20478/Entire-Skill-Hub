import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import businessIdeaRoutes from "./routes/businessIdeaRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Skill-to-Business API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ideas", businessIdeaRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sessions", sessionRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
