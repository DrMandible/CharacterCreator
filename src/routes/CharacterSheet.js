import React from "react";

import { store } from "../data/store";

import { MoveList } from "../components/MoveList";

import * as SC from "../styled";

const TAB_LABELS = ["Stats", "Moves"];

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab_label) => {
    setActiveTab(tab_label);
  };

  return (
    <div className="d-flex w">
      {TAB_LABELS.map((tab_label) => (
        <SC.SmallButton
          onClick={(e) => handleTabClick(tab_label)}
          className="p-1 m-1"
          key={tab_label}
        >
          {tab_label}
        </SC.SmallButton>
      ))}
    </div>
  );
};

const Stats = () => {
  return <div>stats...</div>;
};

export function CharacterSheet() {
  const { state, dispatch } = React.useContext(store);

  const [activeTab, setActiveTab] = React.useState("Moves");

  console.log(state);

  return (
    <div className="w">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Moves" && <MoveList />}
      {activeTab === "Stats" && <Stats />}
      {/* <SC.ToolbarMargin /> */}
    </div>
  );
}
