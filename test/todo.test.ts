import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  addTodo,
  completeTodo,
  filterTodos,
  formatTodo,
  removeTodo,
  type Todo,
} from "../src/todo.ts";

const NOW = new Date("2026-11-25T02:00:00.000Z");

function sample(): Todo[] {
  return [
    { id: 1, title: "A", done: false, createdAt: NOW.toISOString() },
    { id: 2, title: "B", done: true, createdAt: NOW.toISOString() },
  ];
}

describe("addTodo", () => {
  it("appends a pending todo with the next id", () => {
    const result = addTodo(sample(), "  C  ", NOW);
    assert.deepEqual(result[2], {
      id: 3,
      title: "C",
      done: false,
      createdAt: "2026-11-25T02:00:00.000Z",
    });
  });

  it("rejects a blank title", () => {
    assert.throws(() => addTodo([], "   ", NOW), /空白/);
  });
});

describe("completeTodo", () => {
  it("marks the todo done", () => {
    assert.equal(completeTodo(sample(), 1)[0].done, true);
  });

  it("rejects an unknown id", () => {
    assert.throws(() => completeTodo(sample(), 9), /#9/);
  });
});

describe("removeTodo", () => {
  it("removes the todo", () => {
    assert.deepEqual(removeTodo(sample(), 1).map((todo) => todo.id), [2]);
  });
});

describe("filterTodos", () => {
  it("keeps only pending todos by default filter", () => {
    assert.deepEqual(filterTodos(sample(), "pending").map((todo) => todo.id), [1]);
  });

  it("keeps only done todos", () => {
    assert.deepEqual(filterTodos(sample(), "done").map((todo) => todo.id), [2]);
  });

  it("keeps every todo", () => {
    assert.equal(filterTodos(sample(), "all").length, 2);
  });
});

describe("formatTodo", () => {
  it("shows the mark, padded id and title", () => {
    assert.equal(formatTodo(sample()[1]), "[x]   2  B");
  });
});
