import run from "aocrunner";

class Vector2 {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @arg otherVector {Vector2}
   */
  equals(otherVector) {
    return this.x === otherVector.x && this.y === otherVector.y;
  }

}

class Node {

  /**
   * @arg position {Vector2}
   * @arg parent {Node}
   */
  constructor(position = null, parent = null) {
    this.parent = parent;
    this.position = position;
    this.distance = 0; // g
    this.heuristic = 0; // h
    this.cost = 0; // f
  }

  /**
   * @arg otherNode {Node}
   */
  equals(otherNode) {
    return this.position.equals(otherNode.position);
  }

}

const parseMap = (rawInput) => {
  let map = [];
  let startPos;
  let endPos;

  for (let line of rawInput.split('\n')) {
    let row = [];

    for (let char of line) {
      if (char === 'S') {
        startPos = new Vector2(row.length, map.length);
        row.push(1); // Start elevation = a
      } else if (char === 'E') {
        endPos = new Vector2(row.length, map.length);
        row.push(26); // End elevation = z
      } else {
        row.push(char.charCodeAt(0) - 96);
      }
    }

    map.push(row);
  }

  return { map, startPos, endPos };
};

const NEIGHBOUR_DIRS = [ new Vector2(0, 1), new Vector2(0, -1), new Vector2(1, 0), new Vector2(-1, 0), ];
const aStar = (map, startPos, endPos) => {
    const startNode = new Node(startPos);
    const endNode = new Node(endPos);

    let openNodes = [ startNode ];
    let closedNodes = [];

    const startTime = Date.now();
    while (openNodes.length > 0) {
      let currNode = openNodes[0];
      let currIndex = 0;

      for (let i in openNodes) {
        if (openNodes[i].cost < currNode.cost) {
          currNode = openNodes[i];
          currIndex = i;
        }
      }

      openNodes.splice(currIndex, 1);
      closedNodes.push(currNode);

      if (currNode.equals(endNode)) {
        console.log('Found end');
        let path = [];
        let pathNode = currNode;
        while (pathNode !== null) {
          path.push(pathNode.position);
          pathNode = pathNode.parent;
        }

        return path.reverse();
      }

      /** @type {Node[]} */
      let childNodes = [];
      for (let dir of NEIGHBOUR_DIRS) {
        const childPos = new Vector2(currNode.position.x + dir.x, currNode.position.y + dir.y);

        if (childPos.y >= map.length || childPos.y < 0 || childPos.x >= map[0].length || childPos.x < 0) {
          continue;
        }

        if (map[childPos.y][childPos.x] - map[currNode.position.y][currNode.position.x] > 1) {
          continue;
        }

        childNodes.push(new Node(childPos, currNode));
      }

      childLoop: for (let childNode of childNodes) {
        for (let closedNode of closedNodes) {
          if (childNode.equals(closedNode)) {
            continue childLoop;
          }
        }

        childNode.distance = currNode.distance + 1;
        //childNode.heuristic = ((childNode.position.x - endNode.position.x) ** 2) + ((childNode.position.y - endNode.position.y) ** 2);
        childNode.heuristic = Math.abs(endNode.position.x - childNode.position.x) + Math.abs(endNode.position.y - childNode.position.y)
        childNode.cost = childNode.distance + childNode.heuristic;

        for (let openNode of openNodes) {
          if (childNode.equals(openNode) && childNode.distance > openNode.distance) {
            continue childLoop;
          }
        }

        openNodes.push(childNode);
      }

      if (Date.now() - startTime > 200_000) {
        console.log('timeout');
        break;
      }
    }

};


const part1 = (rawInput) => {
  const { map, startPos, endPos } = parseMap(rawInput);

  const path = aStar(map, startPos, endPos);
  console.log(path.map(p => p.x + ', ' + p.y).join('\n'));
  console.log();

  let drawing = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => '.'));
  for (let i = 1; i < path.length; i++) {
    const currPos = path[i];
    const prevPos = path[i - 1];

    if (prevPos.x > currPos.x) {
      drawing[prevPos.y][prevPos.x] = '<';
    } else if (prevPos.x < currPos.x) {
      drawing[prevPos.y][prevPos.x] = '>';
    } else if (prevPos.y > currPos.y) {
      drawing[prevPos.y][prevPos.x] = '^';
    } else {
      drawing[prevPos.y][prevPos.x] = 'v';
    }
  }
  drawing[startPos.y][startPos.x] = 'S';
  drawing[endPos.y][endPos.x] = 'E';

  console.log(drawing.map(row => row.join('')).join('\n'));

  return path.length - 1;
};

const part2 = (rawInput) => {
  const input = parseMap(rawInput);

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
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31
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
