// data/rulebooks.ts
export interface Rulebook {
    playerA: string[];
    playerB: string[];
  }
  
  export const rulebookA: Rulebook = {
    playerA: [
      "The number of DOTS within your partner's marked symbols MUST equal the number of ROUND symbols in your grid.",
      "The number of ROUND symbols on the bottom of your grid MUST equal the number of POINTY symbols on the top of your partner's grid.",
      "Your partner must NOT have any pointy symbols on the 4 central slots of their grid."
    ],
    playerB: [
      "The number of DOTS within the marked symbols of both players MUST be equal.",
      "If you and your partner have equal symbols on equal positions, their rotations must be equal.",
      "You and your partner must NOT mark symbols on the same positions.",
    ]
  };

  export const rulebookB: Rulebook = {
    playerA: [
      "The total number of DOTS of your marked symbols must equal the number of POINTY symbols in your partner's grid.",
      "You and your partner must NOT mark the same symbols (even if they are in different positions)",
      "Your partner must NOT have ROUND symbols adjacent to each other. (Diagonals are NOT adjacent)"
    ],
    playerB: [
      "You must have at least TWO ROUND symbols on the 4 center slots of your grid.",
      "If you and your partner have symbols of the same TYPE in the same positions, their marks must opposite (one marked, one unmarked).",
      "The total sum of DOTS combining yours and your partner's 4 center slots MUST be odd."
    ]
  };
  
  export const rulebookC: Rulebook = {
    playerA: [
      "The number of dots within the marked symbols must be equal to the total number of round symbols on the grid.",
      "No marked symbol may be adjacent to another marked symbol.",
      "No round symbol may be adjacent to another round symbol.",
      "No column may contain more than 7 dots.",
    ],
    playerB: [
      "The number of dots within the marked symbols must be equal to the total number of round symbols on the grid.",
      "No marked symbol may be adjacent to another marked symbol.",
      "No round symbol may be adjacent to another round symbol.",
      "No column may contain more than 7 dots.",
    ]
  };
  