import React, { useState, useEffect } from "react";

import { ReactComponent as Die } from "../assets/die.svg";

import { store } from "../data/store";

import { MoveList } from "../components/MoveList";
import { Roll } from "../components/Roll";

import * as SC from "../styled";

const TAB_LABELS = ["Stats", "Moves", "Journal"];

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab_label) => {
    setActiveTab(tab_label);
  };

  return (
    <div className="d-flex w">
      {TAB_LABELS.map((tab_label) => {
        return (
          <SC.SmallButton
            onClick={(e) => handleTabClick(tab_label)}
            className="p-1 m-1"
            key={tab_label}
            isactive={activeTab === tab_label}
          >
            {tab_label}
          </SC.SmallButton>
        );
      })}
    </div>
  );
};

const Stats = (props) => {
  return (
    <table className="e">
      <tbody>
        {Object.entries(props.stats).map(([statName, statValue]) => (
          <tr className="e" key={statName}>
            <td>
              <b>{statName}: </b>
            </td>
            {/* <td className="indent w">
              <div className="e">{statValue}</div>
            </td> */}
            <td className="d-flex w e">
              <SC.RollButton
                onClick={(e) => props.handleRoll(statName, statValue)}
              >
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
                  <div
                    className="d-flex w c"
                    style={{
                      position: "absolute",
                      top: "0.2rem",
                      left: 0
                    }}
                  >
                    {statValue}
                  </div>
                </div>
              </SC.RollButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Vitals = (props) => {
  const LabelRow = (props) => (
    <tr>
      {props.labels.map((label) => (
        <td
          className="f-a-s"
          key={label}
          style={{
            fontSize: "0.9rem",
            fontStyle: "italic"
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
      // console.log(newMessage);
      // primus.write({
      //   id: state.user.id,
      //   action: "NEW_MESSAGE",
      //   roomId: room.id,
      //   message: newMessage,
      //   userId: state.user.id,
      //   userName: state.user.name
      // });
      console.log("newValue", newValue);
      // props.values[index] = newValue;
      // document.getElementById(`${isEditing}-input`).value = newValue;
      setIsEditing(false);
    };

    const handleEditing = (newValue) => setNewValue(newValue);

    useEffect(() => {}, [newValue]);

    return (
      <tr>
        {props.values.map((value, index) => {
          if (isEditing && isEditing === props.labels[index]) {
            return (
              <td
                key={index}
                className="bdr-b c"
                style={{
                  fontSize: `${[...value].length > 12 ? "1rem" : "1.1rem"}`
                }}
              >
                <form onSubmit={(e) => handleSaveEdit(e, index)}>
                  <input
                    id={`${props.labels[index]}-input`}
                    placeholder={value}
                    onChange={(e) => handleEditing(e.target.value)}
                  ></input>
                </form>
              </td>
            );
          }
          return (
            <td
              onClick={(e) => handleEdit(value, index)}
              key={index}
              className="bdr-b c"
              style={{
                fontSize: `${[...value].length > 12 ? "1rem" : "1.1rem"}`
              }}
            >
              <b>{value}</b>
            </td>
          );
        })}
      </tr>
    );
  };
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
      {/* <table className="w f-a-s">
        <tbody>
          <ValueRow values={["d6", "0"]} />
          <LabelRow labels={["Damage", "Armor"]} />
        </tbody>
      </table> */}
    </div>
  );
};

const ROLL_SCOPES = ["just me", "my campaign"];

const Journal = (props) => {
  if (props.journalEntries.length === 0) {
    return <div>My adventures lie ahead...</div>;
  }

  return (
    <div>
      {Object.entries(props.journalEntries).map(([key, entry]) => (
        <div key={key} className="p-1 f-a-s">
          <div>
            {key} - Rolled: {entry.statName}
          </div>
          <div className="indent">Result: {entry.rollResult}</div>
          {entry.userModDescription && (
            <div className="indent">
              Description: {entry.userModDescription}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export function CharacterSheet() {
  const { state, dispatch } = React.useContext(store);
  const [activeTab, setActiveTab] = React.useState("Moves");
  const [newRoll, setNewRoll] = React.useState(false);

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

  console.log(state.user.character);

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
      <SC.SolidBackground
        className="w bdr-b"
        style={{
          margin: 0,
          padding: 0,
          position: "sticky",
          top: 0
        }}
      >
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </SC.SolidBackground>

      {activeTab === "Moves" && <MoveList handleRoll={handleRoll} />}

      {activeTab === "Stats" && (
        <div style={{ fontSize: "1.2rem" }}>
          <Vitals state={state} handleSaveEdit={handleSaveEdit} />
          <Stats stats={state.user.character.stats} handleRoll={handleRoll} />
        </div>
      )}

      {activeTab === "Journal" && (
        <Journal journalEntries={state.user.character.journalEntries} />
      )}
    </div>
  );
}
