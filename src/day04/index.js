import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let fullOverlaps = 0;
  for (let line of inputLines) {
    const [ firstElf, secondElf ] = line.split(',');

    const [ firstElfSectionStart, firstElfSectionEnd ] = firstElf.split('-').map(Number);
    const [ secondElfSectionStart, secondElfSectionEnd ] = secondElf.split('-').map(Number);

    if (
      (firstElfSectionStart <= secondElfSectionStart && firstElfSectionEnd >= secondElfSectionEnd) ||
      (secondElfSectionStart <= firstElfSectionStart && secondElfSectionEnd >= firstElfSectionEnd)
    ) {
      fullOverlaps++;
    }
  }

  return fullOverlaps;
};

const part2 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let overlaps = 0;
  for (let line of inputLines) {
    const [ firstElf, secondElf ] = line.split(',');

    const [ firstElfSectionStart, firstElfSectionEnd ] = firstElf.split('-').map(Number);
    const [ secondElfSectionStart, secondElfSectionEnd ] = secondElf.split('-').map(Number);

    if (firstElfSectionStart <= secondElfSectionEnd && firstElfSectionEnd >= secondElfSectionStart) {
      overlaps++;
    }
  }

  return overlaps;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2
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
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
