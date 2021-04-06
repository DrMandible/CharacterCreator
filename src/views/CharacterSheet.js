import React, { useState, useEffect } from "react";

import { ReactComponent as Die } from "../assets/die.svg";

import { store } from "../data/store";

import { Tabs } from "../components/Tabs";
import { MoveList } from "../components/MoveList";
import { Roll } from "../components/Roll";

import * as SC from "../styled";

const Stats = (props) => {
  let topVals = [
    Object.values(props.stats)[0],
    Object.values(props.stats)[1],
    Object.values(props.stats)[2]
  ];

  let botVals = [
    Object.values(props.stats)[3],
    Object.values(props.stats)[4],
    Object.values(props.stats)[5]
  ];

  let topLabels = [
    Object.keys(props.stats)[0],
    Object.keys(props.stats)[1],
    Object.keys(props.stats)[2]
  ];
  let botLabels = [
    Object.keys(props.stats)[3],
    Object.keys(props.stats)[4],
    Object.keys(props.stats)[5]
  ];

  let topStats = [
    Object.entries(props.stats)[0],
    Object.entries(props.stats)[1],
    Object.entries(props.stats)[2]
  ];
  let botStats = [
    Object.entries(props.stats)[3],
    Object.entries(props.stats)[4],
    Object.entries(props.stats)[5]
  ];

  return (
    <div>
      <table className="w c" style={{ borderTop: "3px double gray" }}>
        <tbody>
          <ValueRow values={topVals} labels={topLabels} />
          <LabelRow labels={topLabels} />
          <ButtonRow stats={topStats} handleRoll={props.handleRoll} />
        </tbody>
      </table>
      <table className="w c" style={{ borderTop: "3px double gray" }}>
        <tbody>
          <ValueRow values={botVals} labels={botLabels} />
          <LabelRow labels={botLabels} />
          <ButtonRow stats={botStats} handleRoll={props.handleRoll} />
        </tbody>
      </table>
    </div>
  );
};

const ButtonRow = (props) => (
  <tr>
    {props.stats.map(([statName, statValue]) => (
      <td className="c" key={statName}>
        <div className="d-flex w c">
          <SC.RollButton onClick={(e) => props.handleRoll(statName, statValue)}>
            <div className="f-a-s w" style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0
                }}
              >
                <Die />
              </div>
            </div>
          </SC.RollButton>
        </div>
      </td>
    ))}
  </tr>
);

const LabelRow = (props) => (
  <tr className="w">
    {props.labels.map((label) => (
      <td
        className="c"
        key={label}
        style={{
          fontSize: "0.9rem",
          fontStyle: "italic",
          width: `${100 / props.labels.length}%`
        }}
      >
        {label}
      </td>
    ))}
  </tr>
);

const ValueRow = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(null);

  const handleEdit = (value, index) => {
    if (props.canEdit) {
      console.log("editing: ", props.labels[index]);
      setIsEditing(props.labels[index]);
    }
  };

  const handleSaveEdit = async (e, index) => {
    e.preventDefault();
    switch (props.labels[index]) {
      case "Name":
        props.handleSaveEdit({
          type: "SET_NAME",
          payload: newValue
        });
        break;
      default:
        break;
    }
    setIsEditing(false);
  };

  const handleEditing = (newValue) => setNewValue(newValue);

  useEffect(() => {
    if (isEditing) {
      let currentInput = document.getElementById(`${isEditing}-input`);
    }
  }, [newValue]);

  return (
    <tr>
      {props.values.map((value, index) => {
        return isEditing && isEditing === props.labels[index] ? (
          <td key={index} className="bdr-b c" style={{ fontSize: "1.1rem" }}>
            <form onSubmit={(e) => handleSaveEdit(e, index)}>
              <input
                id={`${props.labels[index]}-input`}
                defaultValue={value}
                onChange={(e) => handleEditing(e.target.value)}
                className="c"
              ></input>
            </form>
          </td>
        ) : (
          <td
            onClick={(e) => handleEdit(value, index)}
            key={index}
            className="bdr-b c"
            style={{ fontSize: "1.1rem" }}
          >
            <b>{value}</b>
          </td>
        );
      })}
    </tr>
  );
};

const Vitals = (props) => {
  return (
    <div className="w">
      <table className="w">
        <tbody>
          <ValueRow
            values={[props.state.user.character.name]}
            labels={["Name"]}
            canEdit={true}
            handleSaveEdit={props.handleSaveEdit}
          />
          <LabelRow labels={["Name"]} />
        </tbody>
      </table>
      <table className="w">
        <tbody className="w">
          <ValueRow
            values={["16", "16", "d6", "0"]}
            labels={["HP", "Current", "Damage", "Armor"]}
          />
          <LabelRow labels={["HP", "Current", "Damage", "Armor"]} />
        </tbody>
      </table>
    </div>
  );
};

// const ROLL_SCOPES = ["just me", "my campaign"];

const Journal = (props) => {
  console.log(props.journalEntries);
  return (
    <div>
      {props.journalEntries.length !== 0 ? (
        Object.entries(props.journalEntries).map(([key, entry]) => (
          <div key={key} className="p-1 f-a-s">
            {entry.description && <div>{entry.description}</div>}
            <div className="indent">Rolled: {entry.statName}</div>
            <div className="indent">Result: {entry.total}</div>
          </div>
        ))
      ) : (
        <div>My adventures lie ahead...</div>
      )}
    </div>
  );
};

export function CharacterSheet() {
  const { state, dispatch } = React.useContext(store);
  const [activeTab, setActiveTab] = React.useState("Stats");
  const [newRoll, setNewRoll] = React.useState(false);

  const TAB_LABELS = ["Stats", "Moves", "Journal"];

  const handleRoll = (
    statName = "",
    statValue = "",
    modName = "",
    modValue = 0,
    description = "",
    userModValue = 0,
    userModDescription = ""
  ) => {
    if (statName === "CANCEL") {
      setNewRoll(false);
    } else {
      setNewRoll({
        statName: statName,
        statValue: statValue,
        modName: modName,
        modValue: modValue,
        description: description,
        userModValue: userModValue,
        userModDescription: userModDescription
      });
    }
  };

  const handleSaveEdit = (newDispatch) => dispatch(newDispatch);

  // console.log(state.user.character);

  useEffect(() => {}, [newRoll]);

  return (
    <div className="w" style={{ position: "relative" }}>
      {newRoll && (
        <Roll
          statName={newRoll.statName}
          statValue={newRoll.statValue}
          roll={newRoll}
          handleRoll={handleRoll}
        />
      )}
      <Tabs
        tabLabels={TAB_LABELS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Moves" && <MoveList handleRoll={handleRoll} />}
      {activeTab === "Stats" && (
        <div style={{ fontSize: "1.2rem" }}>
          <Vitals state={state} handleSaveEdit={handleSaveEdit} />
          <Stats stats={state.user.character.stats} handleRoll={handleRoll} />
        </div>
      )}
      {activeTab === "Journal" && (
        <Journal
          journalEntries={[
            ...(state.user.character.journalEntries || []),
            ...(state.user.character.rolls || [])
          ]}
        />
      )}
    </div>
  );
}
