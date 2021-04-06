import React, { useEffect, useContext, useState } from "react";
import Primus from "./primus/primus";

import { CharacterSheet } from "./views/CharacterSheet";
import { CharacterSelect } from "./views/CharacterSelect";
import { Toolbar } from "./components/Toolbar";

import { Login } from "./views/Login";
import { Friends } from "./views/Friends";
import { Account } from "./components/Account";
import { Party } from "./views/Party";
import { Menu } from "./views/Menu";
import { Chat } from "./components/Chat";
import { Campaign } from "./components/Campaign";

import { store } from "./data/store";

import * as SC from "./styled";

const MemoizedFriends = React.memo(Friends);

const URL_PRIMUS_CONNECTION =
  "https://character-companion.glitch.me/api/chat/connect";

const PrimusConnection = () => {
  const { state, dispatch } = useContext(store);

  const [primus, setPrimus] = useState(null);

  useEffect(() => {
    if (primus) return;
    const fetchData = async () => {
      // console.log("starting new primus connection");
      const newPrimusConnection = await new Primus(URL_PRIMUS_CONNECTION);
      // console.log("setPrimus", result);
      setPrimus(newPrimusConnection);
      await dispatch({
        type: "SET_PRIMUS_CONNECTION",
        payload: newPrimusConnection
      });
      await newPrimusConnection.write({
        action: "INITIALIZE",
        payload: "test123"
      });
    };

    fetchData();
  }, []);

  return <div />;
};

export function Main() {
  const { state, dispatch } = useContext(store);
  const [activeViews, setActiveViews] = useState(state.view);
  const [prevView, setPrevView] = useState(null);

  useEffect(() => {
    document.location.hash = String(state.view).toLowerCase();

    if (state.view !== activeViews) {
      setActiveViews(state.view);
    }
  }, [state.view, activeViews]);

  const VIEWS = {
    LOGIN: <Login />,
    PARTY: <Party />,
    FRIENDS: <MemoizedFriends />,
    CHARACTER_SHEET: <CharacterSheet />,
    CHARACTER_SELECT: <CharacterSelect />,
    ACCOUNT: <Account />,
    MENU: <Menu />,
    CHAT: <Chat />,
    CAMPAIGN: <Campaign />
  };
  var w =
    window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : Math.min(
          window.innerWidth ||
            document.documentElement.clientWidth ||
            document.getElementsByTagName("body")[0].clientWidth
        );
  // console.log("w", typeof w, w);
  let cardWidth = w < 700 ? "95vw" : "33vw";
  return (
    <div id="main-root" className="d-flex f-w w c flex-c">
      <div className="d-flex f-w w p-1 c" style={{ alignItems: "flex-start" }}>
        {activeViews?.length > 0 &&
          Array.from(new Set(activeViews)).map((view, key) => {
            return (
              <SC.CardBorders
                cardwidth={cardWidth}
                windowwidth={w}
                key={key}
                id={key}
              >
                {VIEWS[`${view}`]}
              </SC.CardBorders>
            );
          })}
      </div>

      {!state.view.includes("LOGIN") && (
        <React.Fragment>
          <PrimusConnection />
          <SC.ToolbarMargin />
          <Toolbar state={state} dispatch={dispatch} />
        </React.Fragment>
      )}
    </div>
  );
}
