import React from "react";
import { MoveList } from "../components/MoveList";

import * as SC from "../styled";

export function CharacterSheet() {
  return (
    <div className="">
      <MoveList />
      <SC.ToolbarMargin />
    </div>
  );
}
