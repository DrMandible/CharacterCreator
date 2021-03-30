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

  const ValueRow = (props) => (
    <tr>
      {props.values.map((value) => (
        <td key={value} className="bdr-b c">
          <b>{value}</b>
        </td>
      ))}
    </tr>
  );
  return (
    <div className="w">
      <table className="w f-a-s">
        <tbody>
          <ValueRow values={[props.state.user.character.name]} />
          <LabelRow labels={["Name"]} />
        </tbody>
      </table>
      <table className="w f-a-s">
        <tbody>
          <ValueRow values={["16", "0"]} />
          <LabelRow labels={["HP", "Armor"]} />
        </tbody>
      </table>
      <table className="w f-a-s">
        <tbody>
          <ValueRow values={["d6"]} />
          <LabelRow labels={["Damage"]} />
        </tbody>
      </table>
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
        <div className="d-flex" style={{ fontSize: "1.2rem" }}>
          <Vitals state={state} />
          <Stats stats={state.user.character.stats} handleRoll={handleRoll} />
        </div>
      )}

      {activeTab === "Journal" && (
        <Journal journalEntries={state.user.character.journalEntries} />
      )}
    </div>
  );
}
