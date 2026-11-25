import { parseArgs } from "node:util";
import { loadTodos, saveTodos, todoFilePath } from "./store.ts";
import {
  addTodo,
  completeTodo,
  filterTodos,
  formatTodo,
  removeTodo,
  type ListFilter,
} from "./todo.ts";

const USAGE = `用法:
  todo add <標題>          新增待辦
  todo list [--done|--all] 列出待辦 (預設只列未完成)
  todo done <id>           標記完成
  todo rm <id>             刪除`;

function main(argv: string[]): void {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      done: { type: "boolean", default: false },
      all: { type: "boolean", default: false },
    },
    allowPositionals: true,
  });
  const [command, ...rest] = positionals;
  const path = todoFilePath();
  const todos = loadTodos(path);

  switch (command) {
    case "add": {
      const updated = addTodo(todos, rest.join(" "), new Date());
      saveTodos(path, updated);
      console.log(`已新增 ${formatTodo(updated[updated.length - 1])}`);
      return;
    }
    case "list": {
      const filter: ListFilter = values.all ? "all" : values.done ? "done" : "pending";
      const shown = filterTodos(todos, filter);
      if (shown.length === 0) {
        console.log("(沒有待辦)");
        return;
      }
      shown.forEach((todo) => console.log(formatTodo(todo)));
      return;
    }
    case "done": {
      const id = parseId(rest[0]);
      saveTodos(path, completeTodo(todos, id));
      console.log(`已完成 #${id}`);
      return;
    }
    case "rm": {
      const id = parseId(rest[0]);
      saveTodos(path, removeTodo(todos, id));
      console.log(`已刪除 #${id}`);
      return;
    }
    default:
      console.log(USAGE);
  }
}

function parseId(raw: string | undefined): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`無效的 id: ${raw ?? "(未提供)"}`);
  }
  return id;
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
