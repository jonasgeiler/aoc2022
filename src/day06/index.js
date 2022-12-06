import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < input.length - 3; i++) {
    const chars = [ input[i], input[i + 1], input[i + 2], input[i + 3] ]; // Create an array of the next 4 characters
    const charsSet = new Set(chars); // The set will remove any duplicate chars, so if the size is the same as the array, all items are unique

    if (chars.length === charsSet.size) {
      return i + 4; // Return last character position if chars array and chars set have same size
    }
  }

  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < input.length - 13; i++) {
    // Create an array of the next 14 characters
    let chars = [];
    for (let j = 0; j < 14; j++) {
      chars.push(input[i + j]);
    }

    const charsSet = new Set(chars); // Same as in part 1

    if (chars.length === charsSet.size) {
      return i + 14; // Same as in part 1
    }
  }

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
        expected: 7
      },
      {
        input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
        expected: 5
      },
      {
        input: 'nppdvjthqldpwncqszvftbrmjlhg',
        expected: 6
      },
      {
        input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
        expected: 10
      },
      {
        input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
        expected: 11
      },
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
        input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
        expected: 19
      },
      {
        input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
        expected: 23
      },
      {
        input: 'nppdvjthqldpwncqszvftbrmjlhg',
        expected: 23
      },
      {
        input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
        expected: 29
      },
      {
        input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
        expected: 26
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
