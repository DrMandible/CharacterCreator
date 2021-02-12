import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { EditMove } from "./EditMove";

// MODULE SCOPE VARIABLES begin
let characterMoves = {
  test: {
    moveName: "Move Name",
    roll: true,
    modifier: "DEX",
    description: "test description",
    type: "move type (basic, playbook, homebrew, etc)",
    source: "rule source (core, 3rd party playbook, username)"
  },
  test2: {
    moveName: "Move 2 Name",
    roll: false,
    modifier: "DEX",
    description:
      "Commodi sequi iure rem veniam sit quasi eos. Quaerat esse recusandae eos exercitationem quod fugiat. Ut saepe aliquid dicta. Quasi magnam harum nulla at. Magnam et vitae neque commodi harum omnis eos. Quo et est facere et consequatur fuga dolor mollitia.",
    type: "move type (basic, playbook, homebrew, etc)",
    source: "rule source (core, 3rd party playbook, username)"
  }
};
// MODULE SCOPE VARIABLES end

// REACT COMPONENTS begin
const MoveList = () => {
  const [moves, setMoves] = React.useState(characterMoves);
  const [showAddMove, setShowAddMove] = React.useState(false);

  const handleNewMoveClick = (e) => {
    setShowAddMove(true);
  };

  return (
    <div>
      {showAddMove ? (
        <EditMove
          state={[showAddMove, setShowAddMove]}
          moveList={[moves, setMoves]}
        />
      ) : (
        <button className="btn btn-primary gx-2" onClick={handleNewMoveClick}>
          New Move
        </button>
      )}
      <div className="card-deck">
        {Object.entries(moves).map((moveEntry) => {
          let [moveId, move] = moveEntry;
          return <Move move={move} key={moveId} />;
        })}
      </div>
    </div>
  );
};

const Move = (props) => {
  const move = props.move;
  return (
    <div className="card">
      <div className="card-header">
        <b className="card-title">{move.moveName}</b>
      </div>
      <div className="card-body">
        <div>Roll: {move.roll}</div>
        <div>Modifier: {move.modifier}</div>
        <div>Description: {move.description}</div>
      </div>
      <div className="card-footer">
        <div>Type: {move.type}</div>
        <div>Source: {move.source}</div>
      </div>
    </div>
  );
};

export function Main() {
  return (
    <div className="p-3">
      <MoveList />
    </div>
  );
}
// REACT COMPONENTS end
