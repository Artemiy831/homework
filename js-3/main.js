// Задача 1

for (let i = 1; i <= 20; i++) {
  if (i % 4 === 0) {
    continue; // пропускаем числа, кратные 4
  }
  console.log(i);
}

// Задача 2

let n = Number(prompt("Введите число для вычисления факториала:"));
let factorial = 1;

for (let i = 1; i <= n; i++) {
  factorial *= i;
}

console.log(`Факториал числа ${n} = ${factorial}`);


// Задача 3

let size = 8;
let board = "";

for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    if ((row + col) % 2 === 0) {
      board += "ч ";
    } else {
      board += "б ";
    }
  }
  board += "\n"; // переход на новую строку
}

console.log(board);
