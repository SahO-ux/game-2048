import { getColorClass } from "../utils/helpers";

/**
 * Tile component
 * - value: number (0 means empty)
 * - simpler color mapping using helper function
 */
const Tile = ({ value }) => {
  const isEmpty = value === 0;

  const colorClass = getColorClass(value);

  return (
    <div
      className={`tile w-20 h-20 flex items-center justify-center rounded ${
        isEmpty ? "bg-gray-100" : colorClass
      }`}
      aria-label={isEmpty ? "empty tile" : `Tile ${value}`}
      role="img"
    >
      {!isEmpty && <span className="font-bold text-lg">{value}</span>}
    </div>
  );
};

export default Tile;
