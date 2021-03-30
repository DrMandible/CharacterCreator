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
    <table className="d-flex f-a-s p-1" style={{ fontSize: "1.2rem" }}>
      <tbody>
        {Object.entries(props.stats).map(([statName, statValue]) => (
          <tr className="d-flex f-a-s" key={statName}>
            <td>
              <b>{statName}: </b>
            </td>
            <td className="indent w">
              <div className="e">{statValue}</div>
            </td>
            <td className="d-flex">
              <SC.RollButton>
                <Die onClick={(e) => props.handleRoll(statName, statValue)} />
              </SC.RollButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
        <div>
          <b>{state.user.character.name}</b>
        </div>
      </SC.SolidBackground>

      {activeTab === "Moves" && <MoveList handleRoll={handleRoll} />}

      {activeTab === "Stats" && (
        <Stats stats={state.user.character.stats} handleRoll={handleRoll} />
      )}

      {activeTab === "Journal" && (
        <Journal journalEntries={state.user.character.journalEntries} />
      )}
    </div>
  );
}
