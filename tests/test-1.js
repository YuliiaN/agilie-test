// Завдання 1.  Два друга грають у гру, вони обидва загадують число.
// Перший повинен перетворити одне число на інше за допомогою множення цього числа на 2 (10 * 2 = 20) або додаванням одиниці праворуч (10 + 1 = 101).

// Потрібно написати програму, яка буде знаходити, чи можливо одне число перетворити на інше, використовуючи лише перераховані вище операції.

const fs = require("fs");
const path = require("path");
const { tests } = require("../data.json");

const { num1, num2 } = tests.test1;
const filePath = path.join(__dirname, "../", "result.json");

const transformNumbers = (num1, num2) => {
  const doubled = num1 * 2;
  const increment = num1 * 10 + 1;
  // const increment = num1 + "1"; // можна використати, якщо умовою буде передбачуваны дробові числа, але також перевірку на increment треба зробити через нестрогу рівніть ==

  if (doubled === num2) {
    console.log(`test-1: ${num1} * 2 = ${num2}`);
    return true;
  } else if (increment === num2) {
    console.log(`test-1: ${num1} + 1 = ${num2}`);
    return true;
  } else {
    console.log(`test-1: ${num1} to ${num2} cannot be transformed`);
    return false;
  }
};

const result = transformNumbers(num1, num2);

const data = JSON.parse(fs.readFileSync(filePath));

data.test1 = { result: JSON.stringify(result) };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
  console.log("Data has been updated!");
});

module.exports = {
  transformNumbers,
  filePath,
};
