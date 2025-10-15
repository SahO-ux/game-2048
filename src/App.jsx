import { useEffect, useState, useCallback, useMemo } from "react";

import { createStartingBoard, moveBoard } from "./utils/gameLogic";
import { getRandomTile, keyMap } from "./utils/helpers";
import GameBoard from "./pages/GameBoard";

const App = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [board, setBoard] = useState(() => createStartingBoard(boardSize));
  const [score, setScore] = useState(0);

  // Derived check for both "2048 reached" or "no more moves"
  const isGameOver = useCallback((b) => {
    const has2048 = b.some((row) => row.includes(16));
    const noMovesLeft = !["up", "down", "left", "right"].some(
      (dir) => moveBoard(b, dir).moved
    );
    return has2048 || noMovesLeft;
  }, []);

  // Derived boolean — if game has been won or are there any further moves possible
  const gameOver = useMemo(() => isGameOver(board), [board]);

  const handleMove = useCallback(
    (direction) => {
      if (gameOver) return;

      const { newBoard, points, moved } = moveBoard(board, direction);
      if (!moved) return;

      const boardWithNewTile = getRandomTile(newBoard);
      setBoard(boardWithNewTile);
      setScore((prev) => prev + points);
    },
    [board, gameOver]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (gameOver) return;
      const dir = keyMap[e.key];
      if (dir) {
        e.preventDefault();
        handleMove(dir);
      }
    },
    [gameOver, handleMove]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const restartGame = () => {
    setBoard(createStartingBoard(boardSize));
    setScore(0);
  };

  const handleBoardSizeChange = (e) => {
    const newSize = Number(e.target.value);
    if (newSize < 1 || boardSize === newSize) return;
    setBoardSize(newSize);
    setBoard(createStartingBoard(newSize));
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold mb-2">2048 Game</h1>

      {/* Board Size Selector */}
      <div className="flex items-center gap-2">
        <label className="font-semibold text-sm">Board Size:</label>
        <select
          value={boardSize}
          onChange={handleBoardSizeChange}
          className="border border-gray-400 rounded px-2 py-1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          disabled={!gameOver && score > 0}
        >
          <option value={3}>3 × 3</option>
          <option value={4}>4 × 4</option>
          <option value={5}>5 × 5</option>
        </select>
      </div>

      <div className="flex items-center justify-between w-64 mb-2">
        <span className="font-semibold">Score: {score}</span>
        {!gameOver && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            onClick={restartGame}
          >
            Restart
          </button>
        )}
      </div>

      <GameBoard board={board} onMove={handleMove} />

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-red-400 font-bold mb-2">
            {board.some((row) => row.includes(16))
              ? "🎉 You Win!"
              : "Game Over!"}
          </p>
          <button
            onClick={restartGame}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
