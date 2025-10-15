/**
 * Small helper utilities used by the 2048 app.
 * - getColorClass(val): returns tile classname to apply to the cell.
 * - deepCopy(board): simple board clone (keeps immutability).
 * - getEmptyCells(board): returns array of [r,c] coords for empty cells.
 * - getRandomTile(board, twoProbability = 0.9): returns a NEW board with one random tile (2 or 4) placed.
 * - keyMap: maps arrow keys to directions
 */

/** Helper to map numeric value → color class name **/
export const getColorClass = (val) => {
  if (val === 0) return "";
  const level = Math.log2(val); // 2→1, 4→2, 8→3, etc. to find the power value (2^n, to find n)

  // We use Math.min(12, …) just to cap it at 12, so even for higher tiles (like 4096 or 8192),
  // we don’t exceed .tile-12, which is the “dark” color defined for anything above 2048.
  const cappedLevel = Math.min(12, Math.max(1, level)); // clamp between 1–12
  return `tile-${cappedLevel}`;
};

/** Deep clone a 2D board array */
// Can also use inbuilt structeredClone or cloneDeep from lodash library
export const deepCopy = (board) => {
  return board.map((row) => row.slice());
};

/** Return list of empty cell coords as [row, col] */
export const getEmptyCells = (board) => {
  const empties = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) empties.push([r, c]);
    }
  }
  return empties;
};

/**
 * Place one random tile (2 or 4) on a copy of the board.
 * - twoProbability: probability of spawning a 2 (default 0.9). Otherwise spawns 4.
 * - spawns a 2 or 4 with 70%/30% default, change 0.9 to alter this percentage split.
 * - Returns a new board (does not mutate input). If no empty cells, returns a clone.
 */
export const getRandomTile = (board, twoProbability = 0.7) => {
  const empties = getEmptyCells(board);
  const newBoard = deepCopy(board);
  if (empties.length === 0) return newBoard;

  const idx = Math.floor(Math.random() * empties.length);
  const [r, c] = empties[idx];
  newBoard[r][c] = Math.random() < twoProbability ? 2 : 4;
  return newBoard;
};

// map arrow keys to directions
export const keyMap = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};
