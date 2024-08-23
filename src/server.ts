import cors from "cors";
import express, { type Express, Request, Response } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import { alertRouter } from "./api/alert/alertRouter";
import { initDatabase } from "./database";

const logger = pino({ name: "server start" });
const app: Express = express();

initDatabase();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/alert", alertRouter);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("server is running");
});

// Error handlers
app.use(errorHandler());

export { app, logger };
