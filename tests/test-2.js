const fs = require("fs");
const { filePath } = require("./test-1");
const { tests } = require("../data.json");

const { numbers } = tests.test2;

const findDuplicate = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    const k = arr[i] - 1;

    if (arr[k] < 0) {
      console.log(`test-2: Found! Number ${arr[i]} on ${k} position`); // перша позиція елемента, що повторюється
      return true;
    } else {
      arr[k] = -arr[k];
    }
  }

  return false;
};

const result = JSON.stringify(findDuplicate(numbers));

const data = JSON.parse(fs.readFileSync(filePath));

data.test2 = { result };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});

module.exports = findDuplicate;
