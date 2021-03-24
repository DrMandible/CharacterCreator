import React from "react";
import axios from "axios";

import { MoveCard } from "./MoveCard";
import { EditMove } from "./EditMove";

// MODULE SCOPE VARIABLES begin
const URL_BASE = `https://character-companion.glitch.me/api`;
const URL_MOVES = `${URL_BASE}/table/moves`;

const COLUMN_BREAKPOINTS = {
  default: 4,
  1230: 3,
  930: 2,
  615: 1
};

// MODULE SCOPE VARIABLES end

// REACT COMPONENTS begin
export const MoveList = () => {
  const [moves, setMoves] = React.useState([]);
  const [showAddMove, setShowAddMove] = React.useState(false);
  const [data, setData] = React.useState({
    moves: {},
    isFetching: false
  });

  const getMoves = async () => {
    try {
      setData({ moves: data.moves, isFetching: true });

      const response = await axios.get(URL_MOVES, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newMoves = response.data;
      setData({ moves: newMoves, isFetching: false });
      setMoves(newMoves);

      // console.log(newMoves);
    } catch (e) {
      // console.log(e);
      setData({ moves: data.moves, isFetching: false });
    }
  };

  const handleNewMoveClick = (e) => {
    setShowAddMove(true);
  };

  React.useEffect(() => {
    getMoves();
  }, []);

  return (
    <div className="f-w w c">
      {data.isFetching ? (
        <div>loading...</div>
      ) : (
        <div className="w c">
          <div>
            {/* <SC.DeckHeader className="p-1 m-1">
              <div>MOVES</div>
              {!showAddMove && (
                <SC.Button tabindex="0" onClick={handleNewMoveClick}>
                  New Move
                </SC.Button>
              )}
            </SC.DeckHeader> */}
            {showAddMove && (
              <EditMove
                state={[showAddMove, setShowAddMove]}
                moveList={[moves, setMoves]}
              />
            )}
          </div>

          {/* <Masonry
              breakpointCols={COLUMN_BREAKPOINTS}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            > */}
          {Object.entries(moves).map((moveEntry) => {
            let [moveId, move] = moveEntry;
            return (
              <MoveCard
                move={move}
                moveId={moveId}
                key={moveId}
                state={[showAddMove, setShowAddMove]}
                moveList={[moves, setMoves]}
              />
            );
          })}
          {/* </Masonry> */}
        </div>
      )}
    </div>
  );
};
