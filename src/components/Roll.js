import React, { useState, useEffect } from "react";

import { store } from "../data/store";

import * as SC from "../styled";

const scrollTo = (ref) => {
  if (ref /* + other conditions */) {
    ref.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const modsToStats = {
  STR: "Strength",
  DEX: "Dexterity",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Wisdom",
  CHA: "Charisma"
};

const statsToMods = {
  Strength: "STR",
  Dexterity: "DEX",
  Constitution: "CON",
  Intelligence: "INT",
  Wisdom: "WIS",
  Charisma: "CHA"
};

const scoreToBonus = (score) => {
  switch (score) {
    case score < 4:
      return -3;
    case score < 6:
      return -2;
    case score < 9:
      return -1;
    case score < 13:
      return 0;
    case score < 16:
      return 1;
    case score < 18:
      return 2;
    case score >= 18:
      return 3;
    default:
      return 0;
  }
};

const initRoll = (state, roll) => {
  if (roll.statName === "") {
    roll.statName = modsToStats[roll.modName];
    roll.statValue = state.user.character.stats[roll.statName];
  }

  if (roll.modName === "") {
    roll.modName = statsToMods[roll.statName];
    roll.modValue = scoreToBonus(roll.statValue);
  }

  if (roll.description === "") {
    if (roll.moveName) {
      roll.description = roll.moveName;
    } else {
      roll.description = `My ${roll.statName} was tested.`;
    }
  }
  return roll;
};

export const Roll = (props) => {
  const { state, dispatch } = React.useContext(store);
  const [primus, setPrimus] = useState(null);
  const rollModalRef = React.useRef(null);

  const [rollResults, setRollResults] = useState(null);
  const [view, setView] = useState("SETUP");

  const handleSubmitRoll = async (roll) => {
    primus.write({
      action: "NEW_ROLL",
      userId: state.user.id,
      userName: state.user.name,
      roll: roll
    });
  };

  const dispatchRoll = async (newRoll) => {
    await dispatch({
      type: "ADD_ROLL",
      payload: newRoll
    });
  };

  useEffect(() => {
    if (!primus) {
      if (state?.primusConnection) {
        // console.log(state.primusConnection);
        setPrimus(state.primusConnection);
      }
    }
    if (primus) {
      primus.on("data", function message(data) {
        switch (data.action) {
          case "ROLL_RESULTS":
            let newRollResults = data.payload;
            setRollResults(newRollResults);
            setView("RESULTS");
            if (data.payload.recordToJournal) {
              dispatchRoll(data.payload);
            }
            break;

          default:
            break;
        }
      });
    }
  }, [primus, view]);

  return (
    <div
      id="roll-modal"
      className="d-flex w c f-a-s p-1"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        zIndex: 99999,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: "1.3rem"
      }}
    >
      {view === "SETUP" && (
        <RollSetup
          handleSubmitRoll={handleSubmitRoll}
          roll={props.roll}
          handleRoll={props.handleRoll}
        />
      )}

      {view === "RESULTS" && (
        <Results rollResults={rollResults} handleRoll={props.handleRoll} />
      )}
    </div>
  );
};

const Results = (props) => {
  console.log("Results", props.rollResults);

  return (
    <div ref={scrollTo} className="w">
      {props.rollResults.dice.faces.map((faceCount, index) => (
        <div className="w c" key={index}>
          <div>
            Rolled {props.rollResults.dice.numDice[index]}d{faceCount}
          </div>
          <div>Modifier: {props.rollResults.modValue}</div>
          <br />
          <span />
          <br />
          <b>Roll result</b>
          {props.rollResults.dice.results[index].map((result, i) => (
            <div key={i}>
              Dice {i + 1}: {result}
            </div>
          ))}
          <div>
            Total:
            {props.rollResults.total}
          </div>
        </div>
      ))}
      <div className="p-1">
        <SC.SmallButton onClick={(e) => props.handleRoll("CANCEL")}>
          OK
        </SC.SmallButton>
      </div>
    </div>
  );
};

const RollSetup = (props) => {
  const { state, dispatch } = React.useContext(store);

  const [userModValue, setUserModValue] = useState(0);

  const [recordToJournal, setRecordToJournal] = useState(true);

  const [roll, setRoll] = useState(initRoll(state, props.roll));

  const handleRecordToJournal = (e) => {
    document.getElementById("record-to-journal").checked = !recordToJournal;
    setRecordToJournal(!recordToJournal);
  };

  const handleUserModifier = (action) => {
    let newUserModifier;
    switch (action) {
      case "INCREMENT":
        newUserModifier = userModValue + 1;
        setUserModValue(newUserModifier);
        break;
      case "DECREMENT":
        newUserModifier = userModValue - 1;
        setUserModValue(newUserModifier);
        break;
      default:
        break;
    }
  };

  const handleRollUpdate = (rollKey, newValue) => {
    let newRoll = { ...roll, [rollKey]: newValue };
    setRoll(newRoll);
  };

  const handleSubmitRoll = (e) => {
    e.preventDefault();
    let finalRoll = roll;
    finalRoll.modValue = userModValue;
    finalRoll["recordToJournal"] = recordToJournal;
    console.log("rolling: ", finalRoll);
    props.handleSubmitRoll(finalRoll);
  };

  return (
    <div ref={scrollTo} style={{ alignItems: "left", justifyItems: "left" }}>
      <div className="d-flex">
        <div className="p-1">Rolling</div>
        <div className="p-1">
          <b>{roll.statName}</b>
        </div>
      </div>
      <div className="d-flex">
        <div className="p-1">Score: </div>
        <div className="p-1">
          <b>{roll.statValue}</b>
        </div>
      </div>

      <div className="d-flex">
        <div className="p-1">Modifier: </div>

        <div className="d-flex c">
          <div className="m-1">
            <SC.SmallButton
              style={{ minWidth: "1.25rem", minHeight: "1.25rem" }}
              onClick={(e) => handleUserModifier("DECREMENT")}
            >
              -
            </SC.SmallButton>
          </div>

          <div
            className="m-1"
            style={{ minWidth: "1.25rem", height: "1.25rem" }}
          >
            {userModValue > 0 ? `+${userModValue}` : userModValue}
          </div>

          <div className="m-1">
            <SC.SmallButton
              style={{ minWidth: "1.25rem", minHeight: "1.25rem" }}
              onClick={(e) => handleUserModifier("INCREMENT")}
            >
              +
            </SC.SmallButton>
          </div>
        </div>
      </div>

      <div className="d-flex w" style={{ visible: false }}>
        <textarea
          className="d-flex w"
          type="text"
          placeholder={roll.description}
          onChange={(e) => handleRollUpdate("description", e.target.value)}
        />
      </div>

      {/* *** SOCIAL - SHARE SCOPE *** */}
      {/* <div className="d-flex">
          <div className="p-1">Show the result to</div>
          <select defaultValue="my campaign">
            {ROLL_SCOPES.map((scope) => (
              <option className="c" key={scope}>
                {scope}
              </option>
            ))}
          </select>
        </div> */}

      <div className="d-flex">
        <div className="p-1 c">
          <label htmlFor="record-to-journal">
            Record in {state.user.character.name}'s journal
          </label>
        </div>
        <div className="p-1">
          <input
            onChange={(e) => handleRecordToJournal(e)}
            defaultChecked={recordToJournal}
            type="checkbox"
            id="record-to-journal"
          />
        </div>
      </div>
      <div className="p-1 m-1">
        <SC.SmallButton onClick={handleSubmitRoll}>Roll</SC.SmallButton>
        <div className="p-1">
          <SC.SmallButton onClick={(e) => props.handleRoll("CANCEL")}>
            Cancel
          </SC.SmallButton>
        </div>
      </div>
    </div>
  );
};
