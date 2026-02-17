import "./config/env.js";
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import serverConfig from "./config/server.config.js";
import rootRoutes from "./routes/index.js";
import { initDB } from "./lib/index.js";
import logger from "./utilities/logger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await initDB();
    console.log("Database initialized");

    /* -------------------- Trust Proxy (IMPORTANT for prod) -------------------- */
    app.set("trust proxy", 1);

    /* -------------------- Core Security Middlewares -------------------- */
    app.use(
      cors({
        origin: process.env.CLIENT_URL || "*", // restrict in production
        credentials: true,
      }),
    );

    app.use(
      helmet({
        contentSecurityPolicy: false, // API-only backend
      }),
    );

    /* -------------------- Body Parsers -------------------- */
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /* -------------------- Health/Test Route (NO rate limit) -------------------- */
    app.get("/test", (req, res) => {
      res.status(200).json({
        success: true,
        message: "API is healthy",
      });
    });

    /* -------------------- Rate Limiting -------------------- */
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      handler: (req, res) => {
        logger.warn("Rate limit exceeded", {
          ip: req.ip,
          path: req.originalUrl,
        });

        res.status(429).json({
          error: "Too many requests",
        });
      },
    });

    app.use(limiter);

    /* -------------------- Request Logger -------------------- */
    app.use((req, res, next) => {
      const start = Date.now();

      res.on("finish", () => {
        logger.info("Request completed", {
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          durationMs: Date.now() - start,
          ip: req.ip,
        });
      });

      next();
    });
    /* -------------------- Routes -------------------- */
    app.use(rootRoutes);
    /* -------------------- 404 Handler -------------------- */
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
      });
    });
    /* -------------------- Global Error Handler -------------------- */
    app.use((err, req, res, next) => {
      const status = err.status || 500;
      const isProd = process.env.NODE_ENV === "production";

      logger.error("Unhandled API error", {
        method: req.method,
        path: req.originalUrl,
        status,
        message: err.message,
        stack: err.stack,
      });

      res.status(status).json({
        success: false,
        message: isProd ? "Internal Server Error" : err.message,
      });
    });
    /* -------------------- Server Start -------------------- */
    app.listen(serverConfig.PORT, () => {
      logger.info("Server started", {
        port: serverConfig.PORT,
        env: process.env.NODE_ENV,
      });
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
