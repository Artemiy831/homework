export const getTodosfromLocalSrorage = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

export const sertTodosToLocalStorage = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};