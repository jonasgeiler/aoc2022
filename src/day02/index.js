import run from "aocrunner";


// All winning combinations
const wins = [
  '1 3', // Rock defeats Scissors
  '3 2', // Scissors defeats Paper
  '2 1', // Paper defeats Rock
];

// All possible hands
const hands = {
  'A': 1, // Opponent Rock
  'X': 1, // Player Rock

  'B': 2, // Opponent Paper
  'Y': 2, // Player Paper

  'C': 3, // Opponent Scissors
  'Z': 3, // Player Scissors
};


const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let score = 0;
  for (let line of input.split('\n')) {
    const [ opponentHand, playerHand ] = line.split(' ');

    score += hands[playerHand]; // Add points for player's hand

    if (hands[opponentHand] === hands[playerHand]) {
      score += 3; // Draw
    } else if (wins.indexOf(hands[playerHand] + ' ' + hands[opponentHand]) !== -1) {
      score += 6; // Player wins
    }
  }

  return score;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let score = 0;
  for (let line of rawInput.split('\n')) {
    const [ opponentHand, outcome ] = line.split(' ');

    if (outcome === 'X') { // Player needs to loose
      const playerHandPoints = Number(wins.find(win => win.startsWith(hands[opponentHand])).split(' ')[1]); // This finds a win for the opponent, and uses the points from the loosing hand in that combination

      score += playerHandPoints; // Add points for player's hand
    } else if (outcome === 'Y') { // Player needs to make draw
      const playerHandPoints = hands[opponentHand];

      score += playerHandPoints; // Add points for player's hand
      score += 3; // Add points for draw
    } else if (outcome === 'Z') { // Player needs to win
      const playerHandPoints = Number(wins.find(win => win.endsWith(hands[opponentHand])).split(' ')[0]); // This finds a win for the player, and uses the points from the winning hand in that combination

      score += playerHandPoints; // Add points for player's hand
      score += 6; // Add points for win
    }
  }

  return score;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `A Y
B X
C Z`,
        expected: 15
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
                input: `A Y
B X
C Z`,
        expected: 12
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
