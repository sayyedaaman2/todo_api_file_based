import "./config/env.js";
import express from "express";
import serverConfig from "./config/server.config.js";
import rootRoutes from "./routes/index.js";
import { initDB } from "./lib/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    await initDB();
    console.log("Database initialized");

    app.use(rootRoutes);

    app.listen(serverConfig.PORT, () => {
      console.log(`Server running on port ${serverConfig.PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
}

startServer();
