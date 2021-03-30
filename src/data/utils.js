import { Character } from "./character";

export const cleanIntArray = (array) => {
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

export const cleanUser = (user) => {
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

  if (!user.character) {
    user.character = Character();
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
