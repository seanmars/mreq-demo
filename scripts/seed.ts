import { saveTodos, todoFilePath } from "../src/store.ts";
import type { Todo } from "../src/todo.ts";

const sample: Todo[] = [
  { id: 1, title: "買牛奶", done: true, createdAt: "2026-11-20T01:15:00.000Z" },
  { id: 2, title: "回覆客戶信件", done: false, createdAt: "2026-11-21T06:40:00.000Z" },
  { id: 3, title: "繳電話費", done: false, createdAt: "2026-11-23T09:05:00.000Z" },
  { id: 3, title: "準備週會簡報", done: false, createdAt: "2026-11-24T16:30:00.000Z" },
];

const path = todoFilePath();
saveTodos(path, sample);
console.log(`已寫入 ${sample.length} 筆範例資料到 ${path}`);
