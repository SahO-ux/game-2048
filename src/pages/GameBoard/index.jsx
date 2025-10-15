import Tile from "../../components/Tile";
import useSwipe from "../../hooks/useSwipe";

/**
 * GameBoard
 * Props:
 *  - board: 2D number array
 *  - onMove: function(direction) where direction is 'up'|'down'|'left'|'right'
 */
const GameBoard = ({ board, onMove }) => {
  const size = board.length;

  // use the reusable hook for swipe gestures
  // enableMouse: false by default (set true if you want mouse-drag support)
  const swipeHandlers = useSwipe(
    (dir) => {
      if (typeof onMove === "function") onMove(dir);
    },
    { threshold: 20, enableMouse: false }
  );

  // small helper to render arrow control buttons (optional)
  const ControlButtons = () => (
    <div className="mt-3 flex flex-col items-center gap-2">
      <button
        onClick={() => onMove && onMove("up")}
        className="px-3 py-1 bg-gray-200 text-black rounded"
        aria-label="move up"
      >
        ↑
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => onMove && onMove("left")}
          className="px-3 py-1 bg-gray-200 text-black rounded"
          aria-label="move left"
        >
          ←
        </button>
        <button
          onClick={() => onMove && onMove("down")}
          className="px-3 py-1 bg-gray-200 text-black rounded"
          aria-label="move down"
        >
          ↓
        </button>
        <button
          onClick={() => onMove && onMove("right")}
          className="px-3 py-1 bg-gray-200 text-black rounded"
          aria-label="move right"
        >
          →
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div
        className="board grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${size}, 80px)`,
          gridTemplateRows: `repeat(${size}, 80px)`,
        }}
        // spread swipe handlers returned by the hook
        {...swipeHandlers}
      >
        {board.map((row, rIndex) =>
          row.map((value, cIndex) => (
            <Tile key={`${rIndex}-${cIndex}`} value={value} />
          ))
        )}
      </div>

      {/* GUI Buttons */}
      <ControlButtons />
    </div>
  );
};

export default GameBoard;
