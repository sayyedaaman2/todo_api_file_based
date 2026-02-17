import crypto from "node:crypto";

export function createTodo(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload");
  }

  const { title, description } = payload;

  if (!title || typeof title !== "string" || !title.trim()) {
    throw new Error("Todo title is required");
  }

  if (description !== undefined && typeof description !== "string") {
    throw new Error("Description must be a string");
  }

  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description?.trim() || "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTodo(todo, payload) {
  if (!todo || typeof todo !== "object") {
    throw new Error("Invalid existing todo");
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid update payload");
  }

  const updatedTodo = { ...todo };

  if (payload.title !== undefined) {
    if (typeof payload.title !== "string" || !payload.title.trim()) {
      throw new Error("Invalid title");
    }
    updatedTodo.title = payload.title.trim();
  }

  if (payload.description !== undefined) {
    if (typeof payload.description !== "string") {
      throw new Error("Invalid description");
    }
    updatedTodo.description = payload.description.trim();
  }

  if (payload.completed !== undefined) {
    if (typeof payload.completed !== "boolean") {
      throw new Error("Invalid completed value");
    }
    updatedTodo.completed = payload.completed;
  }

  updatedTodo.updatedAt = new Date().toISOString();

  return updatedTodo;
}
