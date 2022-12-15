import run from "aocrunner";

const parseMonkeys = (rawInput) => {
  let monkeys = [];
  let newMonkey = { itemInspections: 0 };
  for (let line of rawInput.split('\n')) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('Starting items')) {
      newMonkey.items = trimmedLine.substr('Starting items: '.length).split(', ').map(i => ({ worryLevel: Number(i) }));
    } else if (trimmedLine.startsWith('Operation')) {
      newMonkey.operation = new Function('old', 'return ' + trimmedLine.substr('Operation: new = '.length));
    } else if (trimmedLine.startsWith('Test')) {
      newMonkey.testDivisible = Number(trimmedLine.substr('Test: divisible by '.length));
    } else if (trimmedLine.startsWith('If true')) {
      newMonkey.ifTrueThrowTo = Number(trimmedLine.substr('If true: throw to monkey '.length));
    } else if (trimmedLine.startsWith('If false')) {
      newMonkey.ifFalseThrowTo = Number(trimmedLine.substr('If false: throw to monkey '.length));

      // This is the last line of each monkey, so add monkey to list of monkeys and reset
      monkeys.push(newMonkey);
      newMonkey = { itemInspections: 0 };
    }
  }

  return monkeys;
};

const part1 = (rawInput) => {
  let monkeys = parseMonkeys(rawInput);

  for (let round = 1; round <= 20; round++) {
    for (let monkeyNum = 0; monkeyNum < monkeys.length; monkeyNum++) { // Loop through all monkeys (do a round)
      const monkey = monkeys[monkeyNum]; // Get current monkey
      const monkeyItemCount = monkey.items.length; // We need to store the amount of items, because it will change during the item-loop

      for (let i = 0; i < monkeyItemCount; i++) { // Repeat for every item
        let item = monkeys[monkeyNum].items.shift(); // Get next/first item in monkey's list
        item.worryLevel = monkey.operation(item.worryLevel); // Worry level changes using the operation
        item.worryLevel = Math.floor(item.worryLevel / 3); // Monkey gets bored with item and worry level is floor-divided by 3

        if (item.worryLevel % monkey.testDivisible === 0) { // Check if the worry level is divisible by the monkey's divider
          monkeys[monkey.ifTrueThrowTo].items.push(item); // If the test succeeded, throw the item to the next monkey
        } else {
          monkeys[monkey.ifFalseThrowTo].items.push(item); // If the test failed, throw it to the other next monkey
        }

        monkeys[monkeyNum].itemInspections++; // Increase item inspections of this monkey
      }
    }
  }

  monkeys.sort((a, b) => b.itemInspections - a.itemInspections); // Sort the monkeys by inspection counts
  return monkeys[0].itemInspections * monkeys[1].itemInspections; // Multiply the first two monkey inspection counts
};

const part2 = (rawInput) => {
  const monkeys = parseMonkeys(rawInput);

  let commonDivisor = 1; // This holds the common divisor of all monkeys, with which we can keep all the worry levels "low", but not break the logic
  for (let monkey of monkeys) {
    commonDivisor *= monkey.testDivisible;
  }

  for (let round = 1; round <= 10000; round++) {
    for (let monkeyNum = 0; monkeyNum < monkeys.length; monkeyNum++) { // Loop through all monkeys (do a round)
      const monkey = monkeys[monkeyNum]; // Get current monkey
      const monkeyItemCount = monkey.items.length; // We need to store the amount of items, because it will change during the item-loop

      for (let i = 0; i < monkeyItemCount; i++) { // Repeat for every item
        let item = monkeys[monkeyNum].items.shift(); // Get next/first item in monkey's list
        item.worryLevel = monkey.operation(item.worryLevel); // Worry level changes using the operation
        item.worryLevel = item.worryLevel % commonDivisor; // Modulo with the common divisor, to keep the number low

        if (item.worryLevel % monkey.testDivisible === 0) { // Check if the worry level is divisible by the monkey's divider
          monkeys[monkey.ifTrueThrowTo].items.push(item); // If the test succeeded, throw the item to the next monkey
        } else {
          monkeys[monkey.ifFalseThrowTo].items.push(item); // If the test failed, throw it to the other next monkey
        }

        monkeys[monkeyNum].itemInspections++; // Increase item inspections of this monkey
      }
    }
  }

  monkeys.sort((a, b) => b.itemInspections - a.itemInspections); // Sort the monkeys by inspection counts
  return monkeys[0].itemInspections * monkeys[1].itemInspections; // Multiply the first two monkey inspection counts
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
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
        input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
