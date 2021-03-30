import React, { useState, useEffect } from "react";

import { store } from "../data/store";

import * as SC from "../styled";

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

  console.log(roll);
  return roll;
};

export const Roll = (props) => {
  const { state, dispatch } = React.useContext(store);
  const [rollResults, setRollResults] = useState(null);
  const [view, setView] = useState("SETUP");

  const handleSubmitRoll = async (roll) => {
    console.log(roll);
    console.log("handleSubmitRoll", state.user.character);
    let rollResult =
      Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1 +
      roll.modValue +
      (roll.userModValue || 0);
    roll["rollResult"] = rollResult;

    setRollResults(roll);

    if (roll.recordToJournal) {
      await dispatch({
        type: "ADD_JOURNAL_ENTRY",
        payload: roll
      });
    }
    setView("RESULTS");
  };

  return (
    <div
      className="d-flex w c"
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
  console.log(props.rollResults);

  return (
    <div>
      Roll result:
      <b>{props.rollResults.rollResult}</b>
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
  const [userModDescription, setUserModDescription] = useState(null);

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

  const handleUserModDescription = (e) => setUserModDescription(e.target.value);

  const handleSubmitRoll = (e) => {
    e.preventDefault();
    let finalRoll = roll;
    finalRoll.userModValue = userModValue;
    finalRoll.userModDescription = userModDescription;
    finalRoll["recordToJournal"] = recordToJournal;
    // console.log("rolling: ", finalRoll);
    props.handleSubmitRoll(finalRoll);
  };

  return (
    <div style={{ alignItems: "left", justifyItems: "left" }}>
      <div className="d-flex">
        <div className="p-1">You're rolling</div>
        <div className="p-1">
          <b>{roll.statName}</b>
        </div>
      </div>
      <div className="d-flex">
        <div className="p-1">You're score: </div>
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
      {userModValue !== 0 && (
        <div className="d-flex w" style={{ visible: false }}>
          <textarea
            className="d-flex w"
            type="text"
            placeholder="Custom modifier description (optional) "
            onChange={handleUserModDescription}
          />
        </div>
      )}

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
