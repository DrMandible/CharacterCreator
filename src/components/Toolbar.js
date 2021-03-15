import React from "react";

import * as SC from "../styled";
import { ReactComponent as IconCharacterSheet } from "../assets/doc.svg";
import { ReactComponent as IconParty } from "../assets/group.svg";
import { ReactComponent as IconMenu } from "../assets/menu.svg";
import { ReactComponent as IconAccount } from "../assets/account.svg";

export const Toolbar = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleClick = (e, view) => {
    e.preventDefault();
    if (props.state.view.includes(view)) {
      console.log("REMOVE_VIEW: ", view);
      props.dispatch({
        type: "REMOVE_VIEW",
        payload: view
      });
    } else {
      console.log("ADD_VIEW: ", view);
      props.dispatch({
        type: "ADD_VIEW",
        payload: view
      });
    }
    setIsExpanded(false);
  };

  const toggleMenuExpand = () => setIsExpanded(!isExpanded);

  const STYLE = {
    justifyContent: `${isExpanded ? "space-around" : "flex-end"}`
  };

  return (
    <SC.Toolbar id="Toolbar" style={STYLE}>
      {isExpanded && (
        <React.Fragment>
          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "CHARACTER_SHEET")}
            currentselection={
              props.state.view.includes("CHARACTER_SHEET") ? true : false
            }
          >
            <IconCharacterSheet />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "FRIENDS")}
            currentselection={
              props.state.view.includes("FRIENDS") ? true : false
            }
          >
            <IconParty />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onClick={(e) => handleClick(e, "ACCOUNT")}
            currentselection={
              props.state.view.includes("ACCOUNT") ? true : false
            }
          >
            <IconAccount />
          </SC.ToolbarOption>
        </React.Fragment>
      )}

      <SC.ToolbarOption
        onClick={toggleMenuExpand}
        currentselection={isExpanded ? true : false}
      >
        <IconMenu />
      </SC.ToolbarOption>
      <SC.ToolbarBG />
    </SC.Toolbar>
  );
};
