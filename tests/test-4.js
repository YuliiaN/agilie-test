const fs = require("fs");
const { filePath } = require("./test-1");
const { tests } = require("../data.json");

const { schema } = tests.test4;

const findPositions = (plan) => {
  const n = plan.length;
  const m = plan[0].length;
  let amount = 0;

  for (let subarray = 0; subarray < n; subarray += 1) {
    for (let position = 0; position < m; position += 1) {
      if (!plan[subarray][position]) {
        if (subarray > 0 && plan[subarray - 1][position] === 1) {
          amount += 1;
        } else if (position < m - 1 && plan[subarray][position + 1] === 1) {
          amount += 1;
        } else if (subarray < n - 1 && plan[subarray + 1][position] === 1) {
          amount += 1;
        } else if (position > 0 && plan[subarray][position - 1] === 1) {
          amount += 1;
        }
      }
    }
  }

  console.log(`test-4: Found ${amount} good positions for spotlight`);
  return amount;
};

const result = findPositions(schema);

const data = JSON.parse(fs.readFileSync(filePath));

data.test4 = { result };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});

module.exports = findPositions;
