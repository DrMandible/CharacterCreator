import React from "react";

import { CharacterSheet } from "./routes/CharacterSheet";
import { CharacterSelect } from "./routes/CharacterSelect";
import { Toolbar } from "./components/Toolbar";

import { Login } from "./routes/Login";
import { Friends } from "./routes/Friends";

import { Party } from "./routes/Party";
import { Menu } from "./routes/Menu";
import { store } from "./data/store";

import * as SC from "./styled";

const View = ({ viewComponent }) => viewComponent;

export function Main() {
  const { state, dispatch } = React.useContext(store);
  const [activeViews, setActiveViews] = React.useState(state.view);

  React.useEffect(() => {
    if (state.view !== activeViews) {
      console.log("state.view: ", state.view);
      setActiveViews(state.view);
    }
  }, [state.view]);

  const VIEWS = {
    LOGIN: <Login />,
    PARTY: <Party />,
    FRIENDS: <Friends />,
    CHARACTER_SHEET: <CharacterSheet />,
    CHARACTER_SELECT: <CharacterSelect />,
    MENU: <Menu />
  };
  var w = window.innerWidth;
  // console.log("state.view: ", VIEWS.LOGIN);
  return (
    <div className="d-flex f-w w c">
      <div className="d-flex f-w f-a-s">
        {activeViews?.length > 0 &&
          Array.from(new Set(activeViews)).map((view, key) => {
            console.log("view: ", view, "key: ", key);
            return (
              <SC.CardBorders windowwidth={w} key={key} id={key}>
                {VIEWS[`${view}`]}
              </SC.CardBorders>
            );
          })}
      </div>
      {/* {state.view.includes("LOGIN") && <Login />}
      {state.view.includes("PARTY") && <Party />}

      {state.view.includes("FRIENDS") && (
        <SC.CardBorders>
          <Friends />
        </SC.CardBorders>
      )}
      {state.view.includes("CHARACTER_SHEET") && (
        <SC.CardBorders>
          <CharacterSheet />
        </SC.CardBorders>
      )}
      {state.view.includes("CHARACTER_SELECT") && <CharacterSelect />}
      {state.view.includes("MENU") && <Menu />} */}

      {!state.view.includes("LOGIN") && (
        <React.Fragment>
          <SC.ToolbarMargin />
          <Toolbar state={state} dispatch={dispatch} />
        </React.Fragment>
      )}
    </div>
  );
}
