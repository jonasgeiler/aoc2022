import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput);

  let headX = 0;
  let headY = 0;
  let tailX = 0;
  let tailY = 0;
  let tailCoords = [];
  for (let line of inputLines) {
    const [ direction, stepsStr ] = line.split(' ');
    const steps = Number(stepsStr);

    for (let step = 0; step < steps; step++) {
      if (direction === 'R') {
        headX++; // Move head right

        if (headX - tailX > 1) { // Check if we need to change tail position (head too far away)
          tailX++; // Move tail to the right, after the head

          if (headY > tailY) {
            // Head is above tail, so also move tail up
            tailY++;
          } else if (headY < tailY) {
            // Head is below tail, so also move tail down
            tailY--;
          }
        }
      } else if (direction === 'L') {
        headX--; // Move head left

        if (tailX - headX > 1) { // Check if we need to change tail position (head too far away)
          tailX--; // Move tail to the left, after the head

          if (headY > tailY) {
            // Head is above tail, so also move tail up
            tailY++;
          } else if (headY < tailY) {
            // Head is below tail, so also move tail down
            tailY--;
          }
        }
      } else if (direction === 'U') {
        headY++; // Move head up

        if (headY - tailY > 1) { // Check if we need to change tail position (head too far away)
          tailY++; // Move the tail up, after the head

          if (headX > tailX) {
            // Head is right of tail, so also move tail right
            tailX++;
          } else if (headX < tailX) {
            // Head is left of tail, so also move tail left
            tailX--;
          }
        }
      } else if (direction === 'D') {
        headY--; // Move head down

        if (tailY - headY > 1) { // Check if we need to change tail position (head too far away)
          tailY--; // Move tail down, after the head

          if (headX > tailX) {
            // Head is right of tail, so also move tail right
            tailX++;
          } else if (headX < tailX) {
            // Head is left of tail, so also move tail left
            tailX--;
          }
        }
      }

      if (!tailCoords.includes(tailX + ',' + tailY)) {
        tailCoords.push(tailX + ',' + tailY)
      }
    }
  }

  return tailCoords.length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

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
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
