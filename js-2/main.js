// Задача 1

const number = 10;

if (number % 2 === 0) {
  console.log("Число чётное");
} else {
  console.log("Число нечётное");
}


// Задача 2

  const age = 30;

  const discount = age < 18 ? 10 : age <= 65 ? 20 : 30;

  console.log(`Скидка: ${discount}%`);

// const age = 70;
// let discount;

// switch (true) {
//   case age < 18:
//     discount = 10;
//     break;
//   case age <= 65:
//     discount = 20;
//     break;
//   default:
//     discount = 30;
// }

// console.log(`Скидка: ${discount}%`);

// Задача 3

const username = prompt("Введите имя пользователя:");
const password = prompt("Введите пароль:");

if (
  (username === "admin" || username === "user") &&
  password === "123456"
) {
  console.log("Доступ разрешен");
} else {
  console.log("Доступ запрещен");
}

