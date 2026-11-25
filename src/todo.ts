export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

export type ListFilter = "pending" | "done" | "all";

export function addTodo(todos: Todo[], title: string, now: Date): Todo[] {
  const trimmed = title.trim();
  if (trimmed === "") {
    throw new Error("標題不能是空白");
  }
  const todo: Todo = {
    id: todos.length + 1,
    title: trimmed,
    done: false,
    createdAt: now.toISOString(),
  };
  return [...todos, todo];
}

export function completeTodo(todos: Todo[], id: number): Todo[] {
  assertExists(todos, id);
  return todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo));
}

export function removeTodo(todos: Todo[], id: number): Todo[] {
  assertExists(todos, id);
  return todos.filter((todo) => todo.id !== id);
}

export function filterTodos(todos: Todo[], filter: ListFilter): Todo[] {
  switch (filter) {
    case "pending":
      return todos.filter((todo) => !todo.done);
    case "done":
      return todos.filter((todo) => todo.done);
    case "all":
      return todos;
  }
}

export function formatTodo(todo: Todo): string {
  const mark = todo.done ? "[x]" : "[ ]";
  return `${mark} ${String(todo.id).padStart(3)}  ${todo.title}`;
}

function assertExists(todos: Todo[], id: number): void {
  if (!todos.some((todo) => todo.id === id)) {
    throw new Error(`找不到 #${id}`);
  }
}
