// components/Grid.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import SymbolCell from './symbolCell';
import { useRouter } from 'next/navigation';
import { gridsA, gridsB } from '@/data/grids';

export interface CellData {
  symbol: number; // Reference to one of the 8 symbols (e.g., 1-8)
  rotation: number;
  marked: boolean;
}

interface GridProps {
  row: string;
  role: 'StudentA' | 'StudentB';
  scenario: 'A' | 'B';
}

export default function Grid({ row, role, scenario }: GridProps) {
  // Choose the initial grid based on the scenario and role.
  const initialGrid: CellData[] =
    scenario === 'A'
      ? role === 'StudentA'
        ? gridsA.studentA
        : gridsA.studentB
      : role === 'StudentA'
      ? gridsB.studentA
      : gridsB.studentB;

  const [grid, setGrid] = useState<CellData[]>(initialGrid);
  const [moves, setMoves] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const router = useRouter();
  const qPressedRef = useRef(false);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // Update a single cell's state.
  const handleCellChange = (index: number, updatedData: Partial<CellData>) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[index] = { ...newGrid[index], ...updatedData };
      return newGrid;
    });
    setMoves((prev) => prev + 1);
  };

  // Swap two cells.
  const handleSwap = (fromIndex: number, toIndex: number) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      const temp = newGrid[fromIndex];
      newGrid[fromIndex] = newGrid[toIndex];
      newGrid[toIndex] = temp;
      return newGrid;
    });
    setMoves((prev) => prev + 1);
  };

  // Submit the grid state to the API.
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

  // Listen for key combination: Ctrl+Q then Ctrl+Enter.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "q") {
        qPressedRef.current = true;
      }
      if (e.ctrlKey && e.key === "Enter" && qPressedRef.current) {
        const confirmed = confirm("Submit your solution?");
        if (confirmed) {
          submitSolution();
        }
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
  }, [grid, moves, startTime]);

  return (
    <div>
      <div className="grid grid-cols-4 w-fit gap-2 mx-auto">
        {grid.map((cell, index) => (
          <SymbolCell
            key={index}
            index={index}
            data={cell}
            onChange={handleCellChange}
            onSwap={handleSwap}
          />
        ))}
      </div>
      {submitted && <p className="mt-2 font-bold">Solution Submitted</p>}
    </div>
  );
}
