"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((t) => t[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }

  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((t) => t[todoKeys.id] === todoId);

  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }

  todos.splice(todoIndex, 1);
  return todos;
};

// 1) При помощи querySelector получаем элементы .form, .input и .todos
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const todosEl = document.querySelector(".todos");

// 2) createTodoElement(todo) — создаём todo как разметку (li) + кнопки
const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.className = "todo";
  li.dataset.id = String(todo[todoKeys.id]);

  if (todo[todoKeys.is_completed]) {
    li.classList.add("completed");
  }

  const textDiv = document.createElement("div");
  textDiv.className = "todo-text";
  textDiv.textContent = todo[todoKeys.text];

  const actionsDiv = document.createElement("div");
  actionsDiv.className = "todo-actions";

  const completeBtn = document.createElement("button");
  completeBtn.className = "button-complete button";
  completeBtn.type = "button";
  completeBtn.innerHTML = "&#10004;";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "button-delete button";
  deleteBtn.type = "button";
  deleteBtn.innerHTML = "&#10006;";

  // complete handler
  completeBtn.addEventListener("click", () => {
    const id = Number(li.dataset.id);
    const updated = completeTodoById(todos, id);
    if (!updated) return;

    li.classList.toggle("completed", updated[todoKeys.is_completed]);
  });

  // delete handler
  deleteBtn.addEventListener("click", () => {
    const id = Number(li.dataset.id);
    deleteTodoById(todos, id);
    li.remove();
  });

  actionsDiv.append(completeBtn, deleteBtn);
  li.append(textDiv, actionsDiv);

  return li;
};

// 3) handleCreateTodo(todos, text) — вызывает createTodo и createTodoElement
const handleCreateTodo = (todos, text) => {
  const trimmed = text.trim();
  if (!trimmed) return;

  const todo = createTodo(todos, trimmed);
  const todoEl = createTodoElement(todo);
  todosEl.appendChild(todoEl);
};

// submit формы
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  handleCreateTodo(todos, inputEl.value);
  inputEl.value = "";
  inputEl.focus();
});
