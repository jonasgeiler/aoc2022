import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let score = 0;
  for (let line of inputLines) {
    const firstHalfItems = line.substring(0, line.length / 2);
    const secondHalfItems = line.substring(line.length / 2);

    let wrongItem;
    firstHalfLoop: for (let item1 of firstHalfItems) {
      for (let item2 of secondHalfItems) {
        if (item1 === item2) {
          wrongItem = item1; // We found two same items, this is the "error"
          break firstHalfLoop; // Break the outer loop
        }
      }
    }

    const wrongItemCode = wrongItem.charCodeAt(0); // Get ASCII code of wrong item
    if (wrongItemCode < 97) { // A-Z
      score += wrongItemCode - 38; // A = 65, 65 - 27 = 38  =>  subtract 38 to make A-Z into 27-52
    } else { // a-z
      score += wrongItemCode - 96; // Z = 96, a = 97  =>  subtract 96 to make a-z into 1-26
    }
  }

  return score;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let groupElfNum = 0;
  let groupLines = [];
  let score = 0;
  for (let line of inputLines) {
    if (groupElfNum === 2) { // We're at the third elf of the group, so look for the badge
      groupLines.push(line); // Add the current line to current group lines

      let badge;
      firstElfLoop: for (let item1 of groupLines[0]) {
        for (let item2 of groupLines[1]) {
          if (item1 === item2) {
            for (let item3 of groupLines[2]) {
              if (item2 === item3) {
                badge = item1; // We found the badge if all items match
                break firstElfLoop;
              }
            }
          }
        }
      }

      const badgeCode = badge.charCodeAt(0); // Get ASCII code of wrong item
      if (badgeCode < 97) { // A-Z
        score += badgeCode - 38; // A = 65, 65 - 27 = 38  =>  subtract 38 to make A-Z into 27-52
      } else { // a-z
        score += badgeCode - 96; // Z = 96, a = 97  =>  subtract 96 to make a-z into 1-26
      }

      // Reset
      groupLines = [];
      groupElfNum = 0;
    } else {
      groupElfNum++; // Just increase the num of the elf in the group
      groupLines.push(line); // Add the current line to current group lines
    }
  }

  return score;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`,
        expected: 157
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
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`,
        expected: 70
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
