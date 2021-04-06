import React from "react";

import * as SC from "../styled";
import { ReactComponent as IconCharacterSheet } from "../assets/doc.svg";
import { ReactComponent as IconFriends } from "../assets/group.svg";
import { ReactComponent as IconMenu } from "../assets/menu.svg";
import { ReactComponent as IconAccount } from "../assets/account.svg";
import { ReactComponent as IconChat } from "../assets/chat.svg";
import { ReactComponent as IconConnections } from "../assets/connections.svg";
import { ReactComponent as IconCompass } from "../assets/compass.svg";

export const Toolbar = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e, view) => {
    e.preventDefault();
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
            <IconCharacterSheet
              style={{
                fill: props.state.view.includes("CHARACTER_SHEET")
                  ? "white"
                  : "black"
              }}
            />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "FRIENDS")}
            currentselection={
              props.state.view.includes("FRIENDS") ? true : false
            }
          >
            <IconFriends
              style={{
                fill: props.state.view.includes("FRIENDS") ? "white" : "black"
              }}
            />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "CHAT")}
            currentselection={props.state.view.includes("CHAT") ? true : false}
          >
            <IconChat
              style={{
                fill: props.state.view.includes("CHAT") ? "white" : "black"
              }}
            />
          </SC.ToolbarOption>

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "CAMPAIGN")}
            currentselection={
              props.state.view.includes("CAMPAIGN") ? true : false
            }
          >
            <IconCompass
              style={{
                fill: props.state.view.includes("CAMPAIGN") ? "white" : "black"
              }}
            />
          </SC.ToolbarOption>

          {/* <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "PARTY")}
            currentselection={props.state.view.includes("PARTY") ? true : false}
          >
            <IconConnections />
          </SC.ToolbarOption> */}

          <SC.ToolbarOption
            onMouseUp={(e) => handleClick(e, "ACCOUNT")}
            currentselection={
              props.state.view.includes("ACCOUNT") ? true : false
            }
          >
            <IconAccount
              style={{
                fill: props.state.view.includes("ACCOUNT") ? "white" : "black"
              }}
            />
          </SC.ToolbarOption>
        </React.Fragment>
      )}

      <SC.ToolbarOption
        onClick={toggleMenuExpand}
        currentselection={isExpanded ? true : false}
      >
        <IconMenu />
      </SC.ToolbarOption>
    </SC.Toolbar>
  );
};
