// Задача 1

const firstName = 'Artemiy';
const lastName = 'Ten';
const isStudent = true;

console.log(firstName, lastName, isStudent);


// Задача 2

const studentAge = 16;
const currentYear = 2026;

const birthYear = currentYear - studentAge;

console.log(currentYear, studentAge, birthYear); 


// Задача 3

const str = `Меня зовут ${firstName} ${lastName},
мне ${studentAge} лет.
Я ученик курса: ${isStudent} `;

console.log(str)

// Задача 4

let a = '123';
let b = +'456';
let c = Number('789');
let d = Boolean(0);
let e = Boolean(' ');
let result = a + b + c + d + e;

console.log(result)

// 692falsetrue


