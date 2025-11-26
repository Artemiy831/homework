// 1) String
// 2) Number
// 3) boolean
// 4) unddefined
// 5) null
// 6) BigInt*
// 7) Symbol*


const user = {
    name: 'Иван',
    age: 30,
    occupation: 'Разработчик'
};

// -----------------------

// Метод Hello

const userWithMethod = {
    name: 'Иван',
    age: 30,
    occupation: 'Разработчик',
    sayHello: function(name) {
        return 'Hello "' + name + '"';
    }
};

console.log(userWithMethod.sayHello('Петр'));

// ----------------------------------
const users = [
    { name: 'Иван', isAdmin: false },
    { name: 'Петр', isAdmin: true },
    { name: 'Анна', isAdmin: false },
    { name: 'Ольга', isAdmin: false }
];

let simpleUsersCount = 0;

for (let i = 0; i < users.length; i++) {
    if (!users[i].isAdmin) {
        simpleUsersCount++;
    }
}

console.log('Количество простых пользователей:', simpleUsersCount);

