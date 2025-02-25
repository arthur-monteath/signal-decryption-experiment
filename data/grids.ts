// @/data/grids.ts
import { CellData } from '@/components/grid';

export const gridsA = {
  studentA: [
    { symbol: 1, rotation: 0, marked: false },  // Row 1
    { symbol: 2, rotation: 90, marked: false },
    { symbol: 7, rotation: 0, marked: false },
    { symbol: 8, rotation: 180, marked: true }, 

    { symbol: 3, rotation: 0, marked: false },  // Row 2
    { symbol: 4, rotation: 90, marked: false },
    { symbol: 1, rotation: 0, marked: false },
    { symbol: 6, rotation: 180, marked: false },

    { symbol: 2, rotation: 0, marked: true },  // Row 3 (CENTER ROW)
    { symbol: 5, rotation: 90, marked: false },
    { symbol: 3, rotation: 270, marked: true },
    { symbol: 7, rotation: 180, marked: false },

    { symbol: 8, rotation: 0, marked: false },  // Row 4
    { symbol: 6, rotation: 90, marked: false },
    { symbol: 4, rotation: 180, marked: false },
    { symbol: 5, rotation: 270, marked: false }
  ] as CellData[],
  studentB: [
    { symbol: 7, rotation: 0, marked: false },  // Row 1
    { symbol: 3, rotation: 90, marked: true },
    { symbol: 2, rotation: 0, marked: false },
    { symbol: 5, rotation: 180, marked: false },

    { symbol: 1, rotation: 90, marked: false }, // Row 2
    { symbol: 8, rotation: 0, marked: false },
    { symbol: 6, rotation: 180, marked: true },
    { symbol: 4, rotation: 270, marked: false },

    { symbol: 5, rotation: 0, marked: false },  // Row 3 (CENTER ROW)
    { symbol: 2, rotation: 90, marked: true },
    { symbol: 3, rotation: 270, marked: false },
    { symbol: 8, rotation: 180, marked: false },

    { symbol: 6, rotation: 0, marked: false },  // Row 4
    { symbol: 4, rotation: 90, marked: false },
    { symbol: 1, rotation: 180, marked: false },
    { symbol: 7, rotation: 270, marked: true }
  ] as CellData[],
};

export const gridsB = {
  studentA: [
    { symbol: 3, rotation: 0, marked: false },
    // ... (total of 16 cells)
  ] as CellData[],
  studentB: [
    { symbol: 4, rotation: 0, marked: false },
    // ... (total of 16 cells)
  ] as CellData[],
};

export const gridC: CellData[] = [
    { symbol: 1, rotation: 0, marked: false },  // Row 1
    { symbol: 5, rotation: 90, marked: true },
    { symbol: 7, rotation: 90, marked: true },
    { symbol: 8, rotation: 180, marked: false },
  
    { symbol: 3, rotation: 0, marked: true },  // Row 2
    { symbol: 4, rotation: 90, marked: false },
    { symbol: 6, rotation: 270, marked: false },
    { symbol: 6, rotation: 180, marked: true },
  
    { symbol: 2, rotation: 0, marked: false },  // Row 3 (CENTER ROW)
    { symbol: 2, rotation: 90, marked: false },
    { symbol: 3, rotation: 270, marked: true },
    { symbol: 7, rotation: 180, marked: false },
  
    { symbol: 8, rotation: 0, marked: false },  // Row 4
    { symbol: 4, rotation: 90, marked: true },
    { symbol: 4, rotation: 180, marked: false },
    { symbol: 5, rotation: 270, marked: true }
  ];  