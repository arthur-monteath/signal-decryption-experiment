// data/rulebooks.ts
export interface Rulebook {
    playerA: string[];
    playerB: string[];
  }
  
  export const rulebookA: Rulebook = {
    playerA: [
      "The number of dots within your partner's marked symbols must equal the number of round symbols in your grid.",
      "The number of round symbols on the bottom of your grid must equal the number of pointy symbols on the top of your partner's grid.",
      "Your partner mustn't have any pointy symbols on the center of their grid."
    ],
    playerB: [
      "The number of dots within the marked symbols of both players must be equal.",
      "If you and your partner have equal symbols on equal positions, their rotations must be equal.",
      "You and your partner mustn't mark symbols on the same positions.",
    ]
  };

  export const rulebookB: Rulebook = {
    playerA: [
      "A.",
    ],
    playerB: [
      "B",
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
  