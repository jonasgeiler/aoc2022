import run from "aocrunner";

const parseInstructions = (rawInput) => rawInput.split('\n').map(line => line.split(' '));

// This function handles all CPU instructions, and also executes a custom cycle handler on every cycle
const handleInstructions = (instructions, handleCycle) => {
  let cycle = 0; // This keeps track of the current cycle
  let registerX = 1; // This keeps track of the value of register X
  for (let [ instruction, ...args ] of instructions) { // Go through all provided instructions
    switch (instruction) { // Handle the instruction
      case 'noop': // Handles the "noop" instruction
        handleCycle(cycle, registerX);
        cycle += 1; // End of cycle
        break;

      case 'addx':
        handleCycle(cycle, registerX);
        cycle += 1; // End of cycle

        handleCycle(cycle, registerX);
        registerX += Number(args[0]);
        cycle += 1; // End of cycle
        break;
    }
  }
};

const part1 = (rawInput) => {
  const instructions = parseInstructions(rawInput);

  let signalStrengthSum = 0; // This keeps track of the signal strength sum
  handleInstructions(instructions, (cycle, registerX) => {
    if ((cycle + 1) === 20 || ((cycle + 1) - 20) % 40 === 0) { // Check if current cycle is an "interesting cycle"
      signalStrengthSum += (cycle + 1) * registerX; // Add current signal strength to total sum
    }
  });

  return signalStrengthSum; // Return result
};

const part2 = (rawInput) => {
  const instructions = parseInstructions(rawInput);

  let outputImage = ''; // This holds the image that is printed on the CRT
  handleInstructions(instructions, (cycle, registerX) => {
    if (cycle % 40 === 0) {
      outputImage += '\n'; // Every 40 cycles, go to next line
    }

    if (Math.abs(registerX - cycle % 40) <= 1) {
      outputImage += '#'; // If current cycle is within the sprite, print a lit pixel
    } else {
      outputImage += '.'; // Otherwise print an unlit pixel
    }
  });

  console.log(outputImage); // Print final image with result
  return 'ECZUZALR';
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
        expected: undefined,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
