import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router.js';
import anilistRouter from './routes/anilist.js';
import newsRoutes from "./routes/newsRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";
import mangaRoutes from "./routes/mangaRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { validateEnv } from "./utils/validateEnv.js";
import helmet from "helmet";
import summaryRoutes from "./routes/summaryRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chatRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import { fakeSession } from "./middleware/dummySession.js";
import apiRoutes from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // adjust later for security
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: import("socket.io").Socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (data: any) => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors({ origin: "*" })); // Lock down in production
app.use(express.json());
app.use(helmet());
app.use(fakeSession);

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(apiLimiter);

// Use modular routers at /api
app.use('/api', router);
app.use('/api', anilistRouter);
app.use("/api/news", newsRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/manga", mangaRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api", apiRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('AniVerse backend is running!');
});

app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", timestamp: Date.now() });
});

validateEnv();

app.use(errorHandler);

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Route not found" });
}); 