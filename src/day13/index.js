import run from "aocrunner";

const parsePacketPairs = (rawInput) => {
  let packetPairs = [];
  let prevPacket = null;
  for (let line of rawInput.split('\n')) {
    if (line.trim() === '') continue;

    if (prevPacket === null) {
      prevPacket = JSON.parse(line);
    } else {
      packetPairs.push([ prevPacket, JSON.parse(line) ]);
      prevPacket = null;
    }
  }

  return packetPairs;
};

const checkPacketOrder = (leftPacket, rightPacket, _indentation = 0) => {
  console.log(' '.repeat(_indentation) + '- Compare ' + JSON.stringify(leftPacket) + ' vs ' + JSON.stringify(rightPacket));

  for (let i = 0; i < Math.max(leftPacket.length, rightPacket.length); i++) {
    if (typeof leftPacket[i] === 'undefined') {
      console.log(' '.repeat(_indentation + 2) + '- Left side ran out of items, so inputs are IN THE RIGHT ORDER');

      return true; // Left side ran out of items, so inputs are in the right order
    } else if (typeof rightPacket[i] === 'undefined') {
      console.log(' '.repeat(_indentation + 2) + '- Right side ran out of items, so inputs are NOT in the right order');

      return false; // Right side ran out of items, so inputs are NOT in the right order
    } else if (typeof leftPacket[i] === 'number' && Array.isArray(rightPacket[i])) {
      console.log(' '.repeat(_indentation + 2) + '- Compare ' + JSON.stringify(leftPacket[i]) + ' vs ' + JSON.stringify(rightPacket[i]));
      console.log(' '.repeat(_indentation + 4) + '- Mixed types; convert left to ' + JSON.stringify([ leftPacket[i] ]) + ' and retry comparison');

      if (!checkPacketOrder([ leftPacket[i] ], rightPacket[i], _indentation + 4)) {
        return false;
      }
    } else if (typeof rightPacket[i] === 'number' && Array.isArray(leftPacket[i])) {
      console.log(' '.repeat(_indentation + 2) + '- Compare ' + JSON.stringify(leftPacket[i]) + ' vs ' + JSON.stringify(rightPacket[i]));
      console.log(' '.repeat(_indentation + 4) + '- Mixed types; convert right to ' + JSON.stringify([ rightPacket[i] ]) + ' and retry comparison');

      if (!checkPacketOrder(leftPacket[i], [ rightPacket[i] ], _indentation + 4)) {
        return false;
      }
    } else if (Array.isArray(leftPacket[i]) && Array.isArray(rightPacket[i])) {
      if (!checkPacketOrder(leftPacket[i], rightPacket[i], _indentation + 2)) {
        return false;
      }
    } else if (leftPacket[i] < rightPacket[i]) {
      console.log(' '.repeat(_indentation + 2) + '- Compare ' + JSON.stringify(leftPacket[i]) + ' vs ' + JSON.stringify(rightPacket[i]));
      console.log(' '.repeat(_indentation + 4) + '- Left side is smaller, so inputs are IN THE RIGHT ORDER');

      return true; // Left side is smaller, so inputs are in the right order
    } else if (leftPacket[i] > rightPacket[i]) {
      console.log(' '.repeat(_indentation + 2) + '- Compare ' + JSON.stringify(leftPacket[i]) + ' vs ' + JSON.stringify(rightPacket[i]));
      console.log(' '.repeat(_indentation + 4) + '- Right side is smaller, so inputs are NOT in the right order');

      return false; // Right side is smaller, so inputs are NOT in the right order
    } else if (leftPacket[i] === rightPacket[i]) {
      console.log(' '.repeat(_indentation + 2) + '- Compare ' + JSON.stringify(leftPacket[i]) + ' vs ' + JSON.stringify(rightPacket[i]));
    } else {
      console.log('ERROR: ', leftPacket, rightPacket, i);
    }
  }

  return true; // If none of the rules applied, the packets are in the right order
};


const part1 = (rawInput) => {
  const packetPairs = parsePacketPairs(rawInput);

  let index = 1;
  let indexSum = 0;
  for (let [ leftPacket, rightPacket ] of packetPairs) {
    console.log('\n== Pair ' + index + ' ==');

    if (checkPacketOrder(leftPacket, rightPacket)) {
      indexSum += index;
    }

    index++;
  }

  return indexSum;
};

const part2 = (rawInput) => {
  const packetPairs = parsePacketPairs(rawInput);

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
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
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
