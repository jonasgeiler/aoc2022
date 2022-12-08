import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(row => row.split('').map(Number));

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);

  let visibleTrees = grid.length * 2 + grid[0].length * 2 - 4; // Initialize visible trees with the amount of trees on the outside of the grid
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      let visibleSides = 4; // We start with 4 visible sides, and count down for every side that has a similar or higher tree

      for (let y2 = y - 1; y2 >= 0; y2--) {
        if (grid[y2][x] >= grid[y][x]) {
          visibleSides--; // We found a similar or higher tree above the current tree, so it's hidden from this side
          break;
        }
      }

      for (let y2 = y + 1; y2 < grid.length; y2++) {
        if (grid[y2][x] >= grid[y][x]) {
          visibleSides--; // We found a similar or higher tree below the current tree, so it's hidden from this side
          break;
        }
      }

      for (let x2 = x - 1; x2 >= 0; x2--) {
        if (grid[y][x2] >= grid[y][x]) {
          visibleSides--; // We found a similar or higher tree left of the current tree, so it's hidden from this side
          break;
        }
      }

      for (let x2 = x + 1; x2 < grid[y].length; x2++) {
        if (grid[y][x2] >= grid[y][x]) {
          visibleSides--; // We found a similar or higher tree right of the current tree, so it's hidden from this side
          break;
        }
      }

      if (visibleSides > 0) {
        visibleTrees++; // If the current tree is not hidden from all sides, we increase the amount of visible trees
      }
    }
  }

  return visibleTrees;
};

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);

  let highestScenicScore = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
      let visibleTreesAbove = 0;
      for (let y2 = y - 1; y2 >= 0; y2--) {
        visibleTreesAbove++;

        if (grid[y2][x] >= grid[y][x]) {
          break;
        }
      }

      let visibleTreesBelow = 0;
      for (let y2 = y + 1; y2 < grid.length; y2++) {
        visibleTreesBelow++;

        if (grid[y2][x] >= grid[y][x]) {
          break;
        }
      }

      let visibleTreesLeft = 0;
      for (let x2 = x - 1; x2 >= 0; x2--) {
        visibleTreesLeft++;

        if (grid[y][x2] >= grid[y][x]) {
          break;
        }
      }

      let visibleTreesRight = 0;
      for (let x2 = x + 1; x2 < grid[y].length; x2++) {
        visibleTreesRight++;

        if (grid[y][x2] >= grid[y][x]) {
          break;
        }
      }

      const scenicScore = visibleTreesAbove * visibleTreesBelow * visibleTreesLeft * visibleTreesRight;
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  return highestScenicScore;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21
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
        input: `30373
25512
65332
33549
35390`,
        expected: 8
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
