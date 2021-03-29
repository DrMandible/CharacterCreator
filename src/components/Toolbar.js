import React from "react";

import * as SC from "../styled";
import { ReactComponent as IconCharacterSheet } from "../assets/doc.svg";
import { ReactComponent as IconParty } from "../assets/group.svg";
import { ReactComponent as IconMenu } from "../assets/menu.svg";
import { ReactComponent as IconAccount } from "../assets/account.svg";
import { ReactComponent as IconChat } from "../assets/chat.svg";

export const Toolbar = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleClick = (e, view) => {
    e.preventDefault();
    // console.log(props.state.view);
    if (props.state.view.includes(view)) {
      props.dispatch({
        type: "REMOVE_VIEW",
        payload: view
      });
    } else {
      props.dispatch({
        type: "ADD_VIEWS",
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
    <SC.Toolbar isexpanded={isExpanded} id="Toolbar" style={STYLE}>
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
            onMouseUp={(e) => handleClick(e, "CHAT")}
            currentselection={props.state.view.includes("CHAT") ? true : false}
          >
            <IconChat />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "ACCOUNT")}
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
      {/* <SC.ToolbarBG /> */}
    </SC.Toolbar>
  );
};
