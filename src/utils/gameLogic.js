import { getRandomTile } from "./helpers";

/**
 * Pure, easy-to-read game logic helpers for 2048.
 * - All functions return new boards (no mutations).
 * - moveBoard handles sliding+merging in any direction but DOES NOT spawn a new tile.
 * - Use a separate helper (e.g., getRandomTile) to add a tile after a successful move.
 */

/* -------------------- Basic helpers -------------------- */

/** Create an empty NxN board (2D array) */
const createEmptyBoard = (size = 4) => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
};

/** Deep-clone a board to preserve immutability */
const cloneBoard = (board) => {
  return board.map((row) => row.slice());
};

/* -------------------- Rotation helpers -------------------- */

/** Rotate board 90° clockwise */
const rotateClockwise = (board) => {
  const n = board.length;
  const out = createEmptyBoard(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out[c][n - 1 - r] = board[r][c];
    }
  }
  return out;
};

/** Rotate board 90° counter-clockwise */
const rotateCounterClockwise = (board) => {
  const n = board.length;
  const out = createEmptyBoard(n);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      out[n - 1 - c][r] = board[r][c];
    }
  }
  return out;
};

/* -------------------- Row movement -------------------- */

/**
 * Move a single row to the left (compress -> merge -> compress)
 * Returns { row: newRowArray, points: number }
 *
 * Example: [2,0,2,2] -> [4,2,0,0], points = 4
 */
const moveRowLeft = (row) => {
  const filtered = row.filter((v) => v !== 0); // remove zeros
  const newRow = [];
  let points = 0;

  let i = 0;
  while (i < filtered.length) {
    // If nums matched, simply multiply by 2 or add them
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged = filtered[i] * 2;
      newRow.push(merged);
      points += merged;
      i += 2; // skip the next tile because it was merged
    } else {
      newRow.push(filtered[i]);
      i += 1;
    }
  }

  // pad with zeros to original length
  while (newRow.length < row.length) newRow.push(0);

  return { row: newRow, points };
};

/* -------------------- Board movement -------------------- */

/**
 * moveBoard(board, direction)
 * - direction: 'left' | 'right' | 'up' | 'down'
 * - returns { newBoard, points, moved }
 *
 * NOTES:
 * - This function only moves/merges tiles. It DOES NOT add a random tile.
 * - The returned `moved` boolean indicates whether the board changed.
 */
const moveBoard = (board, direction = "left") => {
  // work on a copy
  let working = cloneBoard(board);

  // rotate the board so that we can reuse moveRowLeft for all directions
  // target orientation: perform a 'left' move
  if (direction === "up") {
    working = rotateCounterClockwise(working); // up -> left
  } else if (direction === "right") {
    working = rotateClockwise(rotateClockwise(working)); // right -> left (180)
  } else if (direction === "down") {
    working = rotateClockwise(working); // down -> left
  }

  const n = working.length;
  const result = createEmptyBoard(n);
  let totalPoints = 0;
  let moved = false;

  for (let r = 0; r < n; r++) {
    const { row: newRow, points } = moveRowLeft(working[r]);
    result[r] = newRow;
    totalPoints += points;

    // detect if anything changed in this row
    for (let c = 0; c < n; c++) {
      if (newRow[c] !== working[r][c]) moved = true;
    }
  }

  // rotate result back to original orientation
  let newBoard = result;
  if (direction === "up") {
    newBoard = rotateClockwise(result);
  } else if (direction === "right") {
    newBoard = rotateClockwise(rotateClockwise(result));
  } else if (direction === "down") {
    newBoard = rotateCounterClockwise(result);
  }

  return { newBoard, points: totalPoints, moved };
};

/* -------------------- Board initialization -------------------- */

/**
 * initializeBoard(size = 4, startTiles = 2)
 * - Creates an empty board and adds `startTiles` random tiles (2 or 4).
 * - This function DOES depend on getRandomTile to place tiles, so keep that helper separate.
 *
 * NOTE: We don't import getRandomTile here so this function remains pure.
 * The App can call getRandomTile(createEmptyBoard()) externally.
 */
const initializeBoard = (size = 4, startTiles = 2) => {
  // create empty and return — caller should place starting tiles using getRandomTile
  // but for convenience we will return an empty board here (App uses getRandomTile twice)
  return createEmptyBoard(size);
};

/** createStartingBoard(size) - empty board + two random tiles */
const createStartingBoard = (size = 4) => {
  let board = initializeBoard(size);
  board = getRandomTile(board);
  board = getRandomTile(board);
  return board;
};

export { moveBoard, createStartingBoard };
