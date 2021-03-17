import React from "react";

import { CharacterSheet } from "./routes/CharacterSheet";
import { CharacterSelect } from "./routes/CharacterSelect";
import { Toolbar } from "./components/Toolbar";

import { Login } from "./routes/Login";
import { Friends } from "./routes/Friends";
import { Account } from "./components/Account";
import { Party } from "./routes/Party";
import { Menu } from "./routes/Menu";

import { store } from "./data/store";

import * as SC from "./styled";

const View = ({ viewComponent }) => viewComponent;

const MemoizedFriends = React.memo(Friends);

export function Main() {
  const { state, dispatch } = React.useContext(store);
  const [activeViews, setActiveViews] = React.useState(state.view);

  React.useEffect(() => {
    if (state.view !== activeViews) {
      setActiveViews(state.view);
    }
    document.location.hash = String(state.view).toLowerCase();
  }, [state.view]);

  const VIEWS = {
    LOGIN: <Login />,
    PARTY: <Party />,
    FRIENDS: <MemoizedFriends />,
    CHARACTER_SHEET: <CharacterSheet />,
    CHARACTER_SELECT: <CharacterSelect />,
    ACCOUNT: <Account />,
    MENU: <Menu />
  };
  var w =
    window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName("body")[0].clientWidth;
  // console.log("state.view: ", VIEWS.LOGIN);
  return (
    <div className="d-flex f-w w c">
      <div className="d-flex f-w f-a-s p-1">
        {activeViews?.length > 0 &&
          Array.from(new Set(activeViews)).map((view, key) => {
            return (
              <SC.CardBorders windowwidth={w} key={key} id={key}>
                {VIEWS[`${view}`]}
              </SC.CardBorders>
            );
          })}
      </div>

      {!state.view.includes("LOGIN") && (
        <React.Fragment>
          <SC.ToolbarMargin />
          <Toolbar state={state} dispatch={dispatch} />
        </React.Fragment>
      )}
    </div>
  );
}
