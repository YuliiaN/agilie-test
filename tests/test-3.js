const fs = require("fs");
const { filePath } = require("./test-1");
const { tests } = require("../data.json");

const { barWeight, weightsKg, weightsLbs, weight } = tests.test3;

const weightsLbsToKg = weightsLbs.map((weight) => convertLbsToKg(weight));

const allWeightsKg = [...weightsKg, ...weightsLbsToKg];

function convertLbsToKg(lbs) {
  return lbs / 2.20462;
}

function getAllCombinations(arr) {
  const subsets = [[]];

  for (let i = 0; i < arr.length; i += 1) {
    const currentElem = arr[i];
    const subsetsLength = subsets.length;

    for (let k = 0; k < subsetsLength; k += 1) {
      const subset = [...subsets[k], currentElem];

      subsets.push(subset);
    }
  }

  return subsets;
}

function findOptimalWeights(currentWeight) {
  const allCombinations = getAllCombinations(allWeightsKg);
  let optimalWeights = [];
  let diff = Infinity;

  for (let i = 0; i < allCombinations.length; i += 1) {
    let subset = allCombinations[i];
    const totalWeight = subset.reduce((acc, val) => acc + val * 2, barWeight);

    if (totalWeight > currentWeight) {
      const weightDiff = totalWeight - currentWeight;

      if (weightDiff < diff && subset.length <= 24) {
        optimalWeights = subset;
        diff = weightDiff;
      }
    }
  }

  const result = optimalWeights.map((weight) => {
    if (weightsKg.includes(weight)) {
      return `${weight}kg`;
    } else if (weightsLbsToKg.includes(weight)) {
      const idx = weightsLbsToKg.indexOf(weight);
      const lbs = weightsLbs[idx];
      return `${lbs}lbs`;
    }
  });

  console.log(`test-3: Optimal weights: ${result.join(", ")}`);
  return result;
}

const result = findOptimalWeights(weight);

const data = JSON.parse(fs.readFileSync(filePath));

data.test3 = { result };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
});

module.exports = findOptimalWeights;
