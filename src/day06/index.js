import run from "aocrunner";

const getMarkerPos = (text, markerLength) => {
  let charNum = 0; // Keeps track of character number in text
  let appearedChars = []; // Keeps track of appeared characters
  while (charNum < text.length) {
    const char = text[charNum]; // Get current character from text

    if (appearedChars.includes(char)) { // Check if the character already appeared
      charNum -= appearedChars.length - 1; // Revert character position to last position + 1
      appearedChars = []; // Reset appeared characters
      continue; // Next loop
    }

    appearedChars.push(char); // Add current character to appeared characters, so we can check for duplicates
    charNum++; // Increase the character number manually

    if (appearedChars.length === markerLength) {
      return charNum; // If the appeared characters have the same length as the marker, we have found our marker position
    }
  }
};

const part1 = (rawInput) => getMarkerPos(rawInput, 4);
const part2 = (rawInput) => getMarkerPos(rawInput, 14);

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
