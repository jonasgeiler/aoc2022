import run from "aocrunner";

const getMarkerPos = (text, markerLength) => {
  markerSearchLoop: for (let textCharNum = 0; textCharNum < text.length - markerLength - 1; textCharNum++) { // Go through the whole text
    let currChars = []; // Collects characters of current marker
    for (let markerCharNum = 0; markerCharNum < markerLength; markerCharNum++) { // Loops through the marker character offsets
      const currChar = text[textCharNum + markerCharNum]; // Get current character for the marker

      if (currChars.includes(currChar)) { // Check if character already appeared
        continue markerSearchLoop; // Continue to next marker
      }

      currChars.push(currChar); // Add current character to list, so we can check if it already appeared
    }

    // If the loop didn't continue and reaches this code, it means we've found the marker
    return textCharNum + markerLength; // Return the last character position
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
