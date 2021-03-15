import React, { createContext, useReducer } from "react";
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
  view: ["LOGIN"]
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

const cleanIntArray = (array) => {
  let newArray = array || [];
  if (typeof newArray === "string") {
    newArray =
      array.split(",").map(function (item) {
        return parseInt(item, 10);
      }) || [];
  }
  if (newArray && !Number.isInteger(newArray[0])) {
    newArray = [];
  }
  // console.log('newArray: ', typeof newArray, newArray);
  return newArray;
};

const cleanUser = (user) => {
  if (!user.characters) {
    user.characters = [];
  }
  if (!user.friends) {
    user.friends = [];
  }

  if (!user.friendRequests) {
    user.friendRequests = [];
  }
  if (!user.friendRequestsOutgoing) {
    user.friendRequestsOutgoing = [];
  }
  if (typeof user.friendRequests === "string") {
    user.friendRequests =
      user.friendRequests?.split(",").map(function (item) {
        return parseInt(item, 10);
      }) || [];
    if (Number.isNaN(user.friendRequests[0])) {
      user.friendRequests = [];
    }
  }
  if (typeof user.friendRequestsOutgoing === "string") {
    user.friendRequestsOutgoing =
      user.friendRequestsOutgoing?.split(",").map(function (item) {
        return parseInt(item, 10);
      }) || [];
    if (Number.isNaN(user.friendRequestsOutgoing[0])) {
      user.friendRequestsOutgoing = [];
    }
  }
  if (typeof user.friends === "string") {
    user.friends =
      user.friends?.split(",").map(function (item) {
        return parseInt(item, 10);
      }) || [];
    if (Number.isNaN(user.friends[0])) {
      user.friends = [];
    }
  }
  return user;
};

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
        console.log("*** DISPATCH: ***");
        console.log("type: ", action.type);
        console.log("payload: ", action.payload);
        currentState.user = cleanUser(action.payload);
        return currentState;
      case "SET_SESSION":
        currentState.session = action.payload;
        return currentState;
      case "SET_VIEW":
        currentState.view = action.payload;
        return currentState;
      case "ADD_VIEW":
        currentState.view = Array.from(
          new Set([...currentState.view, action.payload])
        );
        return currentState;
      case "REMOVE_VIEW":
        currentState.view = Array.from(
          new Set(removeItemOnce(currentState.view, action.payload))
        );
        return currentState;
      case "SET_FRIEND_REQS":
        currentState.user.friendRequests = cleanIntArray(action.friendRequests);
        currentState.user.friendRequestsOutgoing = cleanIntArray(
          action.friendRequestsOutgoing
        );
        if (action.friends) {
          currentState.user.friends = cleanIntArray(action.friends);
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
      case "SET_HELP_TERM":
        currentState.helpTerm = action.payload;
        return currentState;
      case "SET_MODAL":
        currentState.modal.modalType = action.modalType;
        currentState.modal.show = action.payload;
        currentState.modal.key = action.key;
        currentState.modal.value = action.value;
        return currentState;
      case "SET_NAME":
        currentState.character.name = action.payload;
        return currentState;
      case "SET_STAT":
        currentState.character.stats[action.stat] = action.payload;
        return currentState;
      case "SET_CUSTOM_MOVE":
        return currentState;
      case "SET_THEME":
        currentState.theme[action.target] = action.value;
        return currentState;
      case "TOGGLE_EXPANDED":
        currentState.expanded = action.value;
        return currentState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
