import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(line => {
  const [ direction, stepsStr ] = line.split(' ');
  return [ direction, Number(stepsStr) ];
});

const countTailCoords = (instructions, ropeLength) => {
  let knots = Array.from({ length: ropeLength }, () => [ 0, 0, ]); // Init array representing the knots (first knot is head)
  let tailCoords = new Set(); // Set that holds the coordinates of the tail (Set because we don't want duplicates)
  for (let [ direction, steps ] of instructions) {
    for (let step = 0; step < steps; step++) {
      // Get head position
      let headX = knots[0][0];
      let headY = knots[0][1];

      // Update head position based on instruction
      if (direction === 'R') {
        headX += 1; // Move head right
      } else if (direction === 'L') {
        headX -= 1; // Move head left
      } else if (direction === 'U') {
        headY += 1; // Move head up
      } else if (direction === 'D') {
        headY -= 1; // Move head down
      }

      // Set new head position in the knots array
      knots[0][0] = headX;
      knots[0][1] = headY;

      // Loop through every knot, except the first (head) knot
      for (let knotNum = 1; knotNum < ropeLength; knotNum++) {
        // Get current knot position
        let knotX = knots[knotNum][0];
        let knotY = knots[knotNum][1];

        // Get previous knot position (this is the head position for the second knot)
        const prevKnotX = knots[knotNum - 1][0];
        const prevKnotY = knots[knotNum - 1][1];

        // Get distance between the two knots
        const deltaX = prevKnotX - knotX;
        const deltaY = prevKnotY - knotY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        // Move knot based on distance to the previous knot
        if (distance === 2) { // Previous knot is too far away in the same column/row
          // Move towards it
          knotX += Math.floor(deltaX / 2);
          knotY += Math.floor(deltaY / 2);
        } else if (distance > 2) { // Previous knot is too far away diagonally
          // Move towards it
          knotX += Math.sign(deltaX);
          knotY += Math.sign(deltaY);
        }

        // Set new head position in knot array
        knots[knotNum][0] = knotX;
        knots[knotNum][1] = knotY;
      }

      // Keep track of the last knot positions
      tailCoords.add(knots[ropeLength - 1][0] + ',' + knots[ropeLength - 1][1]);
    }
  }

  return tailCoords.size;
};

const part1 = (rawInput) => {
  const instructions = parseInput(rawInput);

  return countTailCoords(instructions, 2);
};

const part2 = (rawInput) => {
  const instructions = parseInput(rawInput);

  return countTailCoords(instructions, 10);
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
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 1,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
