import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Todo } from "./todo.ts";

export function todoFilePath(): string {
  return process.env.TODO_FILE ?? "todo.json";
}

export function loadTodos(path: string): Todo[] {
  if (!existsSync(path)) {
    return [];
  }
  return JSON.parse(readFileSync(path, "utf8")) as Todo[];
}

export function saveTodos(path: string, todos: Todo[]): void {
  writeFileSync(path, JSON.stringify(todos, null, 2) + "\n");
}
