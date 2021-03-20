import React, { createContext, useReducer } from "react";

import * as utils from "./utils";
import { Character } from "./character";

const initialState = {
  user: {
    id: null,
    userName: null,
    loggedIn: false,
    character: Character(),
    characters: [],
    friends: [],
    friendRequests: [],
    friendRequestsOutgoing: []
  },
  session: null,
  view: ["LOGIN"],
  primusConnections: []
  // helpTerm: null,
  // showNewRoll: false,
  // theme: {
  //   primaryColor: `5, 25, 5, 1`,
  //   textColor: `220, 220, 220, 1`
  // },
  // expanded: ["Stats", "Basic Moves"]
};

export const store = createContext(initialState);

const { Provider } = store;

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const currentState = { ...state };
    switch (action.type) {
      case "LOGIN":
        currentState.user = utils.cleanUser(action.payload);
        currentState.primusConnections = utils.addPrimusConnection({});
        return currentState;
      case "SET_SESSION":
        currentState.session = action.payload;
        return currentState;
      case "SET_VIEW":
        currentState.view = action.payload;
        return currentState;
      case "ADD_VIEWS":
        currentState.view = Array.from(
          new Set([...currentState.view, action.payload])
        );
        console.log(currentState.view);
        return currentState;
      case "REMOVE_VIEW":
        currentState.view = Array.from(
          new Set(removeItemOnce(currentState.view, action.payload))
        );
        return currentState;
      case "SET_FRIEND_REQS":
        currentState.user.friendRequests = utils.cleanIntArray(
          action.friendRequests
        );
        currentState.user.friendRequestsOutgoing = utils.cleanIntArray(
          action.friendRequestsOutgoing
        );
        if (action.friends) {
          currentState.user.friends = utils.cleanIntArray(action.friends);
        }
        return currentState;
      case "ADD_FRIEND_REQ_OUT":
        currentState.friendRequestsOutgoing.push(action.payload);
        return currentState;
      case "ADD_FRIEND_REQ_IN":
        currentState.friendRequests.push(action.payload);
        return currentState;
      case "REMOVE_FRIEND_REQ_OUT":
        currentState.friendRequestsOutgoing = removeItemOnce(
          currentState.friendRequestsOutgoing,
          action.payload
        );
        return currentState;
      case "REMOVE_FRIEND_REQ_IN":
        currentState.friendRequests = removeItemOnce(
          currentState.friendRequests,
          action.payload
        );
        return currentState;
      case "SET_PLAYBOOK":
        currentState.character.playbook = action.payload;
        return currentState;
      // case "SET_HELP_TERM":
      //   currentState.helpTerm = action.payload;
      //   return currentState;
      // case "SET_MODAL":
      //   currentState.modal.modalType = action.modalType;
      //   currentState.modal.show = action.payload;
      //   currentState.modal.key = action.key;
      //   currentState.modal.value = action.value;
      //   return currentState;
      case "SET_NAME":
        currentState.character.name = action.payload;
        return currentState;
      case "SET_STAT":
        currentState.character.stats[action.stat] = action.payload;
        return currentState;
      case "SET_CUSTOM_MOVE":
        return currentState;
      // case "SET_THEME":
      //   currentState.theme[action.target] = action.value;
      //   return currentState;
      // case "TOGGLE_EXPANDED":
      //   currentState.expanded = action.value;
      //   return currentState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
