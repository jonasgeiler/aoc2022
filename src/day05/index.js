import run from "aocrunner";

const parseInput = (rawInput) => {
  let cratesSectionEnded = false; // Whether the crate section ended ('[A] [B] [C]')
  let crates = []; // Holds parsed crates
  let moves = []; // Holds parsed moves
  for (let line of rawInput.split('\n')) {
    if (line.startsWith(' 1')) cratesSectionEnded = true;

    if (!cratesSectionEnded) {
      let stackNum = 0;
      for (let i = 1; i < line.length; i += 4) {
        if (!crates[stackNum]) crates[stackNum] = [];

        crates[stackNum].push(line[i]);
        stackNum++;
      }
    } else if (line.startsWith('move')) {
      const [ _1, amount, _2, from, _3, to ] = line.split(' '); // We'll ignore "move", "from" and "to" texts (underscore vars)

      moves.push({
        amount: Number(amount),
        from: Number(from) - 1, // Subtract 1 to make it usable as array index
        to: Number(to) - 1, // Same here
      });
    }
  }

  return {
    crates: crates.map(stack => stack.reverse().filter(s => s !== ' ')), // Reverse stack and remove empty items
    moves,
  }
};

const part1 = (rawInput) => {
  let { crates, moves } = parseInput(rawInput);

  for (let move of moves) {
    for (let n = 0; n < move.amount; n++) {
      const crate = crates[move.from].pop(); // Remove crate from old stack
      crates[move.to].push(crate); // And add crate to the new stack
    }
  }

  let result = '';
  for (let stack of crates) {
    result += stack[stack.length - 1];
  }

  return result;
};

const part2 = (rawInput) => {
  let { crates, moves } = parseInput(rawInput);

  for (let move of moves) {
    const moveCrates = crates[move.from].splice(crates[move.from].length - move.amount); // Remove crates from old stack
    moveCrates.map(crate => crates[move.to].push(crate)); // And add all crates to the new stack
  }

  let result = '';
  for (let stack of crates) {
    result += stack[stack.length - 1];
  }

  return result;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: 'CMZ',
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
        input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: 'MCD',
      }
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
