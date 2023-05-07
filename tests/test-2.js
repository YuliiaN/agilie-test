// Завдання 2.   Масив "arr" довжиною n+1 містить натуральні числа від 1 до n.
// Знайдіть будь - який елемент, що повторюється в масиві за оптимальний час(O(n)) не змінюючи вихідний масив і не використовуючи додаткову пам'ять.

const fs = require("fs");
const { filePath } = require("./test-1");
const { tests } = require("../data.json");

const { numbers } = tests.test2;

const findDuplicate = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    const k = arr[i] - 1;

    if (arr[k] < 0) {
      console.log(`test-2: Has found! Number ${arr[i]} on ${k} position`); // перша позиція елемента, що повторюється
      return true;
    } else {
      arr[k] = -arr[k];
    }
  }

  return false;
};

const result = findDuplicate(numbers);

const data = JSON.parse(fs.readFileSync(filePath));

data.test2 = { result: JSON.stringify(result) };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
  console.log("Data has been updated!");
});

module.exports = findDuplicate;
