import run from "aocrunner";

const parseInstructions = (rawInput) => rawInput.split('\n').map(line => line.split(' '));

const part1 = (rawInput) => {
  const instructions = parseInstructions(rawInput);

  let cycle = 0;
  let registerX = 1;
  let signalStrengthSum = 0;
  for (let [ instruction, ...args ] of instructions) {
    switch (instruction) {
      case 'noop':
        cycle++;
        if (cycle === 20 || (cycle - 20) % 40 === 0) signalStrengthSum += cycle * registerX;
        break;

      case 'addx':
        cycle++;
        if (cycle === 20 || (cycle - 20) % 40 === 0) signalStrengthSum += cycle * registerX;
        cycle++;
        if (cycle === 20 || (cycle - 20) % 40 === 0) signalStrengthSum += cycle * registerX;

        registerX += Number(args[0]);
        break;
    }
  }

  return signalStrengthSum;
};

const part2 = (rawInput) => {
  const input = parseInstructions(rawInput);

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
        input: `noop
addx 3
addx -5`,
        expected: 0,
      },
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
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
