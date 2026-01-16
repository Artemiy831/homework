function calculateFinalPrice(price, discountPercent, taxRate) {
  const discount = price * (discountPercent / 100);
  const discountedPrice = price - discount;
  const tax = discountedPrice * taxRate;
  return discountedPrice + tax;
}

function checkAccess(username, password) {
  if (username === "admin" && password === "123456") {
    return "Доступ разрешен";
  } else {
    return "Доступ запрещен";
  }
}

function getTimeOfDay(hour) {
  if (hour >= 0 && hour <= 5) return "Ночь";
  else if (hour >= 6 && hour <= 11) return "Утро";
  else if (hour >= 12 && hour <= 17) return "День";
  else if (hour >= 18 && hour <= 23) return "Вечер";
  else return "Некорректное время";
}

function findFirstEven(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) return i;
  }
  return "Чётных чисел нет";
}

// ВЫВОД В КОНСОЛЬ
console.log(calculateFinalPrice(100, 10, 0.2));
console.log(checkAccess("admin", "123456"));
console.log(getTimeOfDay(14));
console.log(findFirstEven(1, 10));
