import React, { createContext, useReducer } from "react";

import * as utils from "./utils";

const initialState = {
  user: {
    id: null,
    userName: null,
    loggedIn: false,
    characters: [],
    friends: [],
    friendRequests: [],
    friendRequestsOutgoing: [],
    image: null,
    description: null,
    invitedChats: null,
    bannedChats: null,
    connectedChats: null,
    joinedChats: null,
    blockedUsers: null
  },
  session: null,
  view: ["LOGIN"],
  prevView: null,
  primusConnection: null
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

const idInObj = (targetId, obj) => {
  for (let entry of obj) {
    if (entry.id === targetId) return true;
  }
  return false;
};

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const addRoll = (currentState, payload) => {
  if (!currentState.user.character["rolls"]) {
    currentState.user.character["rolls"] = [payload];
  } else {
    if (!idInObj(payload.id, currentState.user.character.rolls)) {
      currentState.user.character.rolls = [
        ...currentState.user.character.rolls,
        payload
      ];
    }
  }
  return currentState;
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    // console.log(action);

    const currentState = { ...state };
    switch (action.type) {
      case "LOGIN":
        currentState.user = utils.cleanUser(action.payload);
        return currentState;
      case "SET_SESSION":
        currentState.session = action.payload;
        return currentState;
      case "SET_PRIMUS_CONNECTION":
        if (!currentState.primusConnection) {
          // console.log("SET_PRIMUS_CONNECTION", action.payload);
          currentState.primusConnection = action.payload;
        }
        return currentState;
      case "SET_VIEW":
        currentState.view = action.payload;
        return currentState;
      case "ADD_VIEWS":
        currentState.view = Array.from(
          new Set([...currentState.view, action.payload])
        );
        // console.log(currentState.view);
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
      case "UPDATE_JOINED_CHATS":
        currentState.joinedChats = action.payload;
        return currentState;
      case "ADD_ROLL":
        return addRoll(currentState, action.payload);
      case "SET_PLAYBOOK":
        currentState.character.playbook = action.payload;
        return currentState;
      case "SET_NAME":
        currentState.user.character.name = action.payload;
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
