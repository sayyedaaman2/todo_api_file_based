import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const fileName = process.env.DATABASE_FILE_NAME;

if (!fileName) {
  throw new Error("DATABASE_FILE_NAME is not defined");
}

// Ensure DB file exists and is valid JSON
export async function initDB() {
  if (!existsSync(fileName)) {
    await writeFile(fileName, JSON.stringify({ todos: [] }, null, 2));
    return;
  }

  // Validate JSON structure
  try {
    const content = await readFile(fileName, "utf-8");
    JSON.parse(content);
  } catch {
    throw new Error("Database file is corrupted");
  }
}

// Read todos
export async function readDB() {
  const data = await readFile(fileName, "utf-8");
  return JSON.parse(data);
}

// Write todos
export async function writeDB(data) {
  await writeFile(fileName, JSON.stringify(data, null, 2));
}
