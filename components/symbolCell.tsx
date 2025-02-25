// components/SymbolCell.tsx
import React from "react";
import { CellData } from "./grid";

interface SymbolCellProps {
  index: number;
  data: CellData;
  onChange: (index: number, updatedData: Partial<CellData>) => void;
}

const SymbolCell: React.FC<SymbolCellProps> = ({ index, data, onChange }) => {
  const handleClick = () => {
    // Example: rotate the symbol on click
    const newRotation = data.rotation + 90;
    onChange(index, { rotation: newRotation });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === "m") {
      // Toggle the marked state when "M" is pressed
      onChange(index, { marked: !data.marked });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    // Focus this element when the mouse hovers over it
    e.currentTarget.focus();
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      tabIndex={0} // Make the div focusable so it can receive key events
      className={`select-none p-4 border w-32 h-32 cursor-pointer flex items-center justify-center ${
        data.marked ? "bg-yellow-200 border-yellow-950" : "border-zinc-300"
      }`}
    >
      {data.symbol ? (
        <img
          src={`/symbols/${data.symbol}.png`}
          alt={`Symbol ${data.symbol}`}
          draggable={false}
          style={{ transform: `rotate(${data.rotation}deg)`, userSelect: "none" }}
          className="transition-transform duration-300 ease-in-out"
        />
      ) : (
        <span>Empty</span>
      )}
    </div>
  );
};

export default SymbolCell;
