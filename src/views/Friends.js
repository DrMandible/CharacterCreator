import React from "react";
import axios from "axios";

import "../styles.css";
import * as SC from "../styled/index";
import { store } from "../data/store";
import { getRandomPortrait } from "../data/charNetworkConnections";

import { BubbleWPortrait } from "../components/Bubble";
import { LoadingSpinner } from "../components/LoadingSpinner";

const URL_BASE = `https://character-companion.glitch.me/api`;
const URL_USERS = `${URL_BASE}/users`;
const URL_USERS_BY_ID = (idArray) => `${URL_BASE}/users/${idArray.join("-")}`;

const URL_BEFRIEND = (fromUserId, toUserId) =>
  `${URL_BASE}/befriend/${fromUserId}/${toUserId}`;
const URL_UNFRIEND = (fromUserId, toUserId) =>
  `${URL_BASE}/unfriend/${fromUserId}/${toUserId}`;

export const Friends = () => {
  const { state, dispatch } = React.useContext(store);

  const [searchResults, setSearchResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);

  const [users, setUsers] = React.useState({
    friends: [],
    reqsOut: [],
    reqsIn: []
  });

  const getReqAndFriendIds = () => {
    let userIds = [];
    for (let id of [
      ...state.user.friendRequestsOutgoing,
      ...state.user.friendRequests,
      ...state.user.friends
    ]) {
      if (!Number.isNaN(id)) {
        userIds.push(id);
      }
    }
    // console.log("getReqAndFriendIds: ", typeof userIds, userIds);
    return [...userIds];
  };

  const getUsers = async () => {
    if (
      !state.user.friendRequestsOutgoing ||
      !state.user.friendRequests ||
      !state.user.friends
    )
      return [];
    setIsLoading(true);
    let userIds = getReqAndFriendIds();

    if (userIds?.length > 0) {
      try {
        const response = await axios.get(URL_USERS_BY_ID(userIds), {
          headers: {
            "Content-Type": "application/json"
          }
        });
        // console.log('getUsers server res: ', response);
        let friends = [],
          reqsIn = [],
          reqsOut = [];
        for (let user of response.data) {
          if (state.user.friends.includes(user.id)) friends.push(user);
          if (state.user.friendRequests.includes(user.id)) reqsIn.push(user);
          if (state.user.friendRequestsOutgoing.includes(user.id))
            reqsOut.push(user);
        }
        let newUsers = {
          friends: friends,
          reqsOut: reqsOut,
          reqsIn: reqsIn
        };

        setUsers(newUsers);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    getUsers();
    // console.log("Friends mounted - useEffect - state.user: ", state.user);
  }, []);

  const handleFriendSearch = async (e) => {
    e.preventDefault();
    try {
      setIsSearching(true);
      const response = await axios.get(URL_USERS, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log(response);
      let userIds = getReqAndFriendIds();

      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
    }
    setIsSearching(false);
  };

  const handleFriendReq = async (e, toUserId, action) => {
    e.preventDefault();
    // console.log('handleFriendReq: ', toUserId, action);
    let url;
    if (action === "SEND_REQ") {
      url = URL_BEFRIEND(state.user.id, toUserId);
    }

    if (action === "CANCEL_REQ") {
      url = URL_UNFRIEND(state.user.id, toUserId);
    }

    try {
      const response = await axios.post(url, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log('handleFriendReq - response.data: ', response.data);

      let newDispatch = {
        type: "SET_FRIEND_REQS",
        friendRequestsOutgoing: response.data.friendRequestsOutgoing,
        friendRequests: response.data.friendRequests
      };
      if (response.data.friends) newDispatch.friends = response.data.friends;
      let userIds = getReqAndFriendIds();
      if (searchResults.length > 0) {
        let newSearchResults = searchResults.filter(
          (value) => !userIds.includes(value.id)
        );
        // console.log("newSearchResults:", newSearchResults);
        setSearchResults(newSearchResults);
      }
      // console.log("newDispatch: ", newDispatch);
      dispatch(newDispatch);
      getUsers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleToggleSearch = () => {
    setSearchResults([]);
  };

  // console.log('state.user', state.user);

  return (
    <div className="w">
      {isLoading && <LoadingSpinner />}
      {users.friends.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>FRIENDS</SC.CardBodyTitle>
          <Deck
            users={users.friends}
            btnHandler={handleFriendReq}
            friendStatus="FRIEND"
          />
        </React.Fragment>
      )}
      {users.reqsIn.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>NEW FRIEND REQUESTS</SC.CardBodyTitle>
          <Deck
            users={users.reqsIn}
            btnHandler={handleFriendReq}
            friendStatus="REQ_IN"
          />
        </React.Fragment>
      )}

      {users.reqsOut.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>PENDING FRIEND REQUESTS</SC.CardBodyTitle>
          <Deck
            users={users.reqsOut}
            btnHandler={handleFriendReq}
            friendStatus="REQ_OUT"
          />
        </React.Fragment>
      )}

      {searchResults && searchResults?.length > 0 && (
        <div>
          <div>Search Results...</div>
          <div onClick={handleToggleSearch} className="p-1">
            <SC.SmallButton style={{ height: "2rem", width: "2rem" }}>
              X
            </SC.SmallButton>
          </div>

          <Deck
            users={searchResults}
            btnHandler={handleFriendReq}
            friendStatus="STRANGER"
          />
        </div>
      )}
      <div>
        <SC.SmallButton onClick={handleFriendSearch} className="c">
          Find
          {isSearching ? (
            <LoadingSpinner />
          ) : (
            <span role="img" aria-label="Find friends">
              🔍
            </span>
          )}
        </SC.SmallButton>
      </div>
      {/* <SC.ToolbarMargin /> */}
    </div>
  );
};

function Deck({ users, btnHandler, friendStatus }) {
  let fullText;
  let btns = ["CONFIRM", "CANCEL"];
  switch (friendStatus) {
    case "REQ_OUT":
      fullText = "Friend request sent";
      btns = ["CANCEL"];
      break;
    case "FRIEND":
      fullText = "Friend";
      btns = ["CANCEL"];
      break;
    case "REQ_IN":
      fullText = "Wants to be friends";
      break;
    case "STRANGER":
      fullText = "Send Friend Request";
      btns = ["CONFIRM"];
      break;
    default:
      break;
  }

  let confirmIcon = friendStatus === "STRANGER" ? "➕" : "✔️";

  return (
    <div className="bdr-t w">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          handleFriendReq={btnHandler}
          confirmIcon={confirmIcon}
          fullText={fullText}
          btns={btns}
        />
      ))}
    </div>
  );
}

const UserCard = ({
  user,
  handleFriendReq,
  confirmIcon,
  fullText = "",
  label = "",
  btns
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBtnClick = (e, id, action) => {
    e.preventDefault();
    setIsLoading(true);
    handleFriendReq(e, id, action);
    setIsLoading(false);
  };

  return (
    <SC.Card className="bdr-b f-a-s f-sb m-1">
      <BubbleWPortrait
        name={user.userName}
        image={
          user.image && user.image !== "none"
            ? user.image
            : getRandomPortrait(user.userName)
        }
        label={label}
        fullText={fullText}
      />
      {isLoading && <LoadingSpinner />}
      {btns.includes("CANCEL") && (
        <div className="d-flex p-1">
          <SC.SmallButton
            style={{ height: "2rem", width: "2rem" }}
            onClick={(e) => handleBtnClick(e, user.id, "CANCEL_REQ")}
          >
            <div className="tc">
              <span role="img" aria-label="Cancel">
                ❌
              </span>
            </div>
          </SC.SmallButton>
        </div>
      )}
      {btns.includes("CONFIRM") && (
        <div className="d-flex p-1">
          <SC.SmallButton
            style={{ height: "2rem", width: "2rem" }}
            onClick={(e) => handleBtnClick(e, user.id, "SEND_REQ")}
          >
            <div className="tc">
              <span role="img" aria-label={`Confirm ${user.userName}`}>
                {confirmIcon}
              </span>
            </div>
          </SC.SmallButton>
        </div>
      )}
    </SC.Card>
  );
};
