// 1) String
// 2) Number
// 3) boolean
// 4) unddefined
// 5) null
// 6) BigInt*
// 7) Symbol*


// первое

function greetUser(name) {
  return 'Hello' + name;
}

console.log(greetUser('Alex'));

// второе

const numbersArray = [5, 12, 8, 21, 3, 15, 9]
function displayLargeNumbers(arr) {
  arr.forEach(number => {
    if (number > 10) {
      console.log(number);
    }
  })
}

displayLargeNumbers(numbersArray)

// третье

function calculator(num1, num2, operator) {
  switch (operator) {
    case 'plus':
      return num1 + num2;
    case 'minus':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        return "Ошибка: деление на ноль";
      }
    default:
      return "Ошибка: неверный оператор";
  }
}

const result = calculator(2, 3, 'minus');
console.log(result);

