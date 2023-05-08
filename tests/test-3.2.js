const fs = require("fs");
const { filePath } = require("./test-1");
const { tests } = require("../data.json");

const { sizes, sportsmen } = tests.test3_2;

function findTShirts(sizes, sportsmen) {
  const successfulResult = "test-3.2: All sportsmen can get the t-shirt";
  const failureResult = "test-3.2: Not all sportsmen can get the t-shirt";

  for (let i = 0; i < sportsmen.length; i += 1) {
    const currentSportsman = sportsmen[i];

    // Перевірка, чи є потрібний розмір, якщо вказано один

    if (currentSportsman.length === 1) {
      const size = currentSportsman[0];
      if (sizes[size] > 0) {
        sizes[size] -= 1;
      } else {
        console.log(failureResult);
        return false;
      }
    }

    // Перевірка, чи є один з 2х вказаних розмірів

    if (currentSportsman.length === 2) {
      const size1 = currentSportsman[0];
      const size2 = currentSportsman[1];
      if (sizes[size1] > 0) {
        sizes[size1] -= 1;
      } else if (sizes[size2] > 0) {
        sizes[size2] -= 1;
      } else {
        console.log(failureResult);
        return false;
      }
    }
  }

  console.log(successfulResult);
  return true;
}

const result = JSON.stringify(findTShirts(sizes, sportsmen));

const data = JSON.parse(fs.readFileSync(filePath));

data.test3_2 = { result };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});

module.exports = findTShirts;
