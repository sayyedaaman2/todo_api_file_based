import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import dbConfig from "../config/db.config.js";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB file lives next to this file
const DB_FILE = path.join(__dirname, dbConfig.DATABASE_FILE_NAME);

if (!dbConfig.DATABASE_FILE_NAME) {
  throw new Error("DATABASE_FILE_NAME is not defined");
}

// Ensure DB file exists and is valid JSON
export async function initDB() {
  if (!existsSync(DB_FILE)) {
    await writeFile(
      DB_FILE,
      JSON.stringify({ todos: [] }, null, 2)
    );
    return;
  }

  try {
    const content = await readFile(DB_FILE, "utf-8");
    JSON.parse(content);
  } catch {
    throw new Error("Database file is corrupted");
  }
}

// Read DB
export async function readDB() {
  const data = await readFile(DB_FILE, "utf-8");
  return JSON.parse(data);
}

// Write DB
export async function writeDB(data) {
  return await writeFile(DB_FILE, JSON.stringify(data, null, 2));
}
