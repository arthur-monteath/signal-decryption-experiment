// data/rulebooks.ts
export interface Rulebook {
    playerA: string[];
    playerB: string[];
  }
  
  export const rulebookA: Rulebook = {
    playerA: [
      "The number of dots within your partner's marked symbols must equal the number of round symbols in your grid.",
      "If you have more than 3 hexagons, your partner must swap their spirals with triangles.",
      "Your partner mustn't have any pointy symbols on the center of their grid."
    ],
    playerB: [
      "The number of dots within the marked symbols of both players must be equal.",
      "If you and your partner have equal symbols on equal positions, their rotations must be equal.",
      "You and your partner mustn't mark symbols on the same positions.",
      "No straight line in neither grids may have 10 or more dots."
    ]
  };
  
  export const rulebookB: Rulebook = {
    playerA: [
      // Define Scenario B rules here
      "Scenario B rule for Player A: [Your rule here]"
    ],
    playerB: [
      // Define Scenario B rules here
      "Scenario B rule for Player B: [Your rule here]"
    ]
  };
  