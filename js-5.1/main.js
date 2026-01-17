// =========================
// Задача 1
// =========================
// Создайте объект person с несколькими свойствами и выведите их в консоль.

const person = {
  name: "Alex",
  age: 21,
  city: "Amsterdam",
  hobby: "coding",
  isStudent: true,
};

console.log("Задача 1:");
console.log("name:", person.name);
console.log("age:", person.age);
console.log("city:", person.city);
console.log("hobby:", person.hobby);
console.log("isStudent:", person.isStudent);


// =========================
// Задача 2
// =========================
// Функция isEmpty: проверяет пустой ли объект.
// Пустой = нет своих перечисляемых ключей.

function isEmpty(obj) {
  for (const key in obj) {
    // если нашли хотя бы один ключ — объект не пустой
    return false;
  }
  return true;
}

console.log("\nЗадача 2:");
console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false


// =========================
// Задача 3
// =========================
// Объект task + cloneAndModify(object, modifications)
// делаем копию через spread и применяем изменения.

const task = {
  title: "Learn JS",
  description: "Practice objects and functions",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  // spread: сначала копируем object, затем "перезаписываем" поля из modifications
  return { ...object, ...modifications };
}

const updatedTask = cloneAndModify(task, {
  isCompleted: true,
  title: "Learn JS (done)",
});

console.log("\nЗадача 3:");
for (const key in updatedTask) {
  console.log(`${key}:`, updatedTask[key]);
}


// =========================
// Задача 4
// =========================
// callAllMethods(obj): вызывает все методы объекта (все свойства-функции)

function callAllMethods(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "function") {
      obj[key](); // вызов метода
    }
  }
}

// Пример использования из задания:
const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },
  method2() {
    console.log("Метод 2 вызван");
  },
  property: "Это не метод",
};

console.log("\nЗадача 4:");
callAllMethods(myObject);
