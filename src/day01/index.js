import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let currElfCalories = 0;
  let highestElfCalories = 0;

  for (let line of input.split('\n')) {
    if (line === '') {
      if (currElfCalories > highestElfCalories) {
        highestElfCalories = currElfCalories;
      }

      currElfCalories = 0;
    } else {
      currElfCalories += Number(line);
    }
  }

  return highestElfCalories;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let elfCalories = [];
  let currElfCalories = 0;

  for (let line of rawInput.split('\n')) {
    if (line === '') {
      elfCalories.push(currElfCalories);
      currElfCalories = 0;
    } else {
      currElfCalories += Number(line);
    }
  }
  elfCalories.push(currElfCalories); // Add the last elf

  const elfCaloriesSorted = elfCalories.sort((a, b) => b - a);
  return elfCaloriesSorted[0] + elfCaloriesSorted[1] + elfCaloriesSorted[2];
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
