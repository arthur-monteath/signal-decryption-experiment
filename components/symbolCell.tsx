// components/SymbolCell.tsx
import React from "react";
import { CellData } from "./grid";

interface SymbolCellProps {
  index: number;
  data: CellData;
  onChange: (index: number, updatedData: Partial<CellData>) => void;
  onSwap: (fromIndex: number, toIndex: number) => void;
}

const SymbolCell: React.FC<SymbolCellProps> = ({ index, data, onChange, onSwap }) => {
  // Rotate the symbol on click.
  const handleClick = () => {
    const newRotation = data.rotation + 90;
    onChange(index, { rotation: newRotation });
  };

  // When dragging starts, save the index in the event's dataTransfer.
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  // Allow drop by preventing the default.
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // When a draggable symbol is dropped, retrieve the source index and swap.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fromIndexStr = e.dataTransfer.getData("text/plain");
    const fromIndex = parseInt(fromIndexStr, 10);
    if (!isNaN(fromIndex) && fromIndex !== index) {
      onSwap(fromIndex, index);
    }
  };

  // Allow marking the cell via keyboard (pressing "M").
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === "m") {
      onChange(index, { marked: !data.marked });
    }
  };

  // Automatically focus on hover so that key events can be captured.
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.focus();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      tabIndex={0}
      className={`select-none p-4 w-32 h-32 cursor-pointer flex items-center justify-center transition-all duration-200 ${
        data.marked 
          ? "bg-yellow-200 border-4 border-yellow-950" 
          : "border-4  hover:border-blue-500"
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
