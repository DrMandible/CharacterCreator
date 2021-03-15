import React from "react";
import { MoveList } from "../components/MoveList";

import * as SC from "../styled";

const TAB_LABELS = ["Stats", "Moves"];

const Tabs = ({ activeTab, setActiveTab }) => {
  console.log(activeTab);

  const handleTabClick = (tab_label) => {
    setActiveTab(tab_label);
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "100%"
      }}
    >
      {TAB_LABELS.map((tab_label) => (
        <div
          onClick={(e) => handleTabClick(tab_label)}
          className="p-1 m-1"
          key={tab_label}
        >
          {tab_label}
        </div>
      ))}
    </div>
  );
};

const Stats = () => {
  return <div>stats...</div>;
};

export function CharacterSheet() {
  const [activeTab, setActiveTab] = React.useState("Stats");

  const ref = React.createRef();

  React.useEffect(() => {
    if (ref.current) {
      console.log(ref);
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [ref]);

  return (
    <div className="">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Moves" && <MoveList />}
      {activeTab === "Stats" && <Stats />}
      {/* <SC.ToolbarMargin /> */}
    </div>
  );
}
