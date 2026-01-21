// Исходный массив
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
]

// Задание 1.
// Добавляем двух пользователей в конец массива
users.push(
  { name: 'Ann', age: 19, isAdmin: false },
  { name: 'Jack', age: 43, isAdmin: true }
)

console.log(users)


// Задание 2.
// Средний возраст пользователей
function getUserAverageAge(users) {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0)
  return totalAge / users.length
}

console.log(getUserAverageAge(users))


// Задание 3.
// Получить всех администраторов
function getAllAdmins(users) {
  return users.filter(user => user.isAdmin)
}

console.log(getAllAdmins(users))


// Задание 4.
// Функция first(arr, n)
function first(arr, n) {
  if (n === 0) return []
  if (n === undefined) return [arr[0]]
  return arr.slice(0, n)
}

// Примеры:
console.log(first([1, 2, 3, 4], 2))      // [1, 2]
console.log(first([1, 2, 3, 4], 0))      // []
console.log(first([1, 2, 3, 4]))         // [1]
