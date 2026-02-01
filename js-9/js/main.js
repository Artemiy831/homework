import { getTodosfromLocalSrorage } from "./storage.js";
import { renderTodos, initTodoHandlers } from "./dom.js";


const todos = getTodosfromLocalSrorage() || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  initTodoHandlers(todos);
});

