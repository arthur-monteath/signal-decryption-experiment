// components/Grid.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import SymbolCell from './symbolCell';
import { useRouter } from 'next/navigation';

export interface CellData {
  symbol: number; // Reference to one of the 8 symbols (e.g., 1-8)
  rotation: number;
  marked: boolean;
}

interface GridProps {
  row: string;
  role: 'StudentA' | 'StudentB';
}

const initialGrid: CellData[] = Array.from({ length: 16 }, () => ({
  symbol: 1,
  rotation: 0,
  marked: false,
}));

export default function Grid({ row, role }: GridProps) {
  const [grid, setGrid] = useState<CellData[]>(initialGrid);
  const [moves, setMoves] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const router = useRouter();

  // Ref to track if "q" was pressed
  const qPressedRef = useRef(false);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const handleCellChange = (index: number, updatedData: Partial<CellData>) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = { ...newGrid[index], ...updatedData };
      return newGrid;
    });
    setMoves((prev) => prev + 1);
  };

  // Submission function: submits the grid state to your API route.
  const submitSolution = async () => {
    const timeTaken = new Date().getTime() - (startTime?.getTime() || new Date().getTime());

    try {
      await fetch('/api/checkSolution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          row,
          role,
          grid,
          time: timeTaken,
          moves,
        }),
      });
      alert("Solution submitted!");
      setSubmitted(true);
      router.push('/');
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your solution.");
    }
  };

  // Key handler for detecting Ctrl+Q followed by Ctrl+Enter.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If Ctrl+Q is pressed, mark qPressedRef true.
      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        qPressedRef.current = true;
      }
      // If Ctrl+Enter is pressed and q was pressed previously, trigger submission.
      if (e.ctrlKey && e.key === "Enter" && qPressedRef.current) {
        const confirmed = confirm("Submit your solution?");
        if (confirmed) {
          submitSolution();
        }
        // Reset the flag regardless.
        qPressedRef.current = false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "q") {
        qPressedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [grid, moves, startTime]); // Ensure the latest grid state is used

  return (
    <div>
      <div className="grid grid-cols-4 w-fit gap-2 mx-auto">
        {grid.map((cell, index) => (
          <SymbolCell key={index} index={index} data={cell} onChange={handleCellChange} />
        ))}
      </div>
      {submitted && <p className="mt-2 font-bold">Solution Submitted</p>}
    </div>
  );
}
