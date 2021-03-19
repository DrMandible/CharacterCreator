import React from "react";
import "../styles.css";
import * as SC from "../styled/index";
import { store } from "../data/store";

export const CharacterSelect = () => {
  const { state, dispatch } = React.useContext(store);
  return (
    <div>
      Your characters...
      {state.user.characters.map((character) => (
        <SC.SmallButton>{character.name}</SC.SmallButton>
      ))}
    </div>
  );
};
