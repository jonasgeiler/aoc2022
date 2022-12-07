import run from "aocrunner";

const getFileSizes = (rawInput) => {
  let path = [];
  let files = {};
  for (let line of rawInput.split('\n')) {
    if (line.startsWith('$ cd')) { // Change directory command
      const newDirectory = line.split(' ')[2];

      if (newDirectory === '/') {
        path = []; // Reset the path
      } else if (newDirectory === '..') {
        path.pop(); // Go up one level
      } else {
        path.push(newDirectory); // Go down into the directory
      }
    } else if (!line.startsWith('$ ls') && !line.startsWith('dir')) { // Listing File (exclude Listing Directory and List command)
      const [ fileSize, fileName ] = line.split(' ');
      const filePath = [ ...path, fileName ].join('/');

      files[filePath] = Number(fileSize); // Add it to list of files with it's full path
    }
  }

  return files;
};

const getDirectorySizes = (files) => {
  let directories = {
    '/': 0, // Pre-define the root directory
  };
  for (let filePath in files) {
    const fileSize = files[filePath];
    const filePathParts = filePath.split('/');

    directories['/'] += fileSize; // Always increase size of root directory

    if (filePathParts.length > 1) { // Check if the current file is not in the root directory
      for (let i = -filePathParts.length + 1; i < 0; i++) { // Loop through the parent directories of the current file
        const dirPath = filePathParts.slice(0, i).join('/');

        if (dirPath in directories) {
          directories[dirPath] += fileSize; // Just increase the directory size
        } else {
          directories[dirPath] = fileSize; // If directory not in the object yet, we'll intialize it with the current file size
        }
      }
    }
  }

  return directories;
};


const part1 = (rawInput) => {
  const files = getFileSizes(rawInput);
  const directories = getDirectorySizes(files);

  let totalDirSize = 0;
  for (let dirPath in directories) {
    const dirSize = directories[dirPath];

    if (dirSize <= 100_000) {
      totalDirSize += dirSize;
    }
  }

  return totalDirSize;
};

const part2 = (rawInput) => {
  const files = getFileSizes(rawInput);
  const directories = getDirectorySizes(files);

  const requiredSpace = 30_000_000 - (70_000_000 - directories['/']);

  let smallestDirSize = Infinity;
  for (let dirPath in directories) {
    const dirSize = directories[dirPath];

    if (dirSize > requiredSpace && dirSize < smallestDirSize) {
      smallestDirSize = dirSize;
    }
  }

  return smallestDirSize;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95_437
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
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24_933_642
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
