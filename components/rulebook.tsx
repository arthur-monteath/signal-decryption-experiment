// components/rulebook.tsx
import React from "react";
import { rulebookA, rulebookB, Rulebook as RulebookType } from "@/data/rulebooks";

interface RulebookProps {
  isPlayerA: boolean;
  scenario: 'A' | 'B';
}

const Rulebook: React.FC<RulebookProps> = ({ isPlayerA, scenario }) => {
  // Select the appropriate rulebook based on the scenario prop.
  const selectedRulebook: RulebookType = scenario === 'A' ? rulebookA : rulebookB;

  return (
    <div className="p-2 mx-auto max-w-xl">
      <h2 className="text-xl font-bold mb-2">Rules</h2>
      <ul className="list-disc ml-5 text-lg/6">
        {(isPlayerA ? selectedRulebook.playerA : selectedRulebook.playerB).map((rule, idx) => (
          <li className="mb-4" key={idx}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default Rulebook;
