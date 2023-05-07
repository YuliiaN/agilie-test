// Завдання 3.
// 3.1
// На змаганнях з паверліфтингу використовуються дискові навантажувачі вагою 0.5, 1, 2.5, 5, 10, 15, 20 та 25 кг.
// Також ми маємо американські дискові навантажувачі вагу яких визначено у lbs. Такі  дискові навантажувачі є тільки в 10, 25, 35, 45 фунтів.
// Гриф на штанзі завжди один і дорівнює 20кг.

// Потрібно знайти таку комбінацію дисковихі навантажувачів, щоб вага на штанзі була мінімальною, але перевищувала максимальний рекорд. Наприклад, Спортсмен номер 1 підняв 101 кг використовуючи гриф 20кг, 4 дискових навантажувачі по 20 кг та два по 0.5.
// Для того щоб перевершити вагу попереднього спортсмена, Спортсмену номер 2 буде оптимально підняти 101.44 які можна отримати з грифу 20 кг і двох дискових навантажувачів наступних найменувань  1, 2.5, 10, кг та 25, 35 lbs.

// Треба написати програму, яка за заданою вагою буде знаходити мінімальний наступний.

// ! Важливо, що  дискові навантажувачі будь-якої ваги вішаються на штангу попарно. Так само на штанзі може бути не більше 24 дискових  навантажувачі, тобто максимум 12 з кожного боку.

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

  return optimalWeights.map((weight) => {
    if (weightsKg.includes(weight)) {
      return `${weight}kg`;
    } else if (weightsLbsToKg.includes(weight)) {
      const idx = weightsLbsToKg.indexOf(weight);
      const lbs = weightsLbs[idx];
      return `${lbs}lbs`;
    }
  });
}

const result = findOptimalWeights(weight);

const data = JSON.parse(fs.readFileSync(filePath));

data.test3 = { result };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
  console.log("Data has been updated!");
});

module.exports = findOptimalWeights;
