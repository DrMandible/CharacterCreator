import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import "../styles.css";
import * as SC from "../styled/index";
import { store } from "../data/store";
import { getRandomPortrait } from "../data/charNetworkConnections";

import { BubbleWPortrait } from "../components/Bubble";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Tabs } from "../components/Tabs";

const URL_BASE = `https://character-companion.glitch.me/api`;
const URL_USERS = `${URL_BASE}/users`;
const URL_USERS_BY_ID = (idArray) => `${URL_BASE}/users/${idArray.join("-")}`;

const URL_BEFRIEND = (fromUserId, toUserId) =>
  `${URL_BASE}/befriend/${fromUserId}/${toUserId}`;
const URL_UNFRIEND = (fromUserId, toUserId) =>
  `${URL_BASE}/unfriend/${fromUserId}/${toUserId}`;

export const Friends = () => {
  const { state, dispatch } = useContext(store);
  const [primus, setPrimus] = useState(null);

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const [activeTab, setActiveTab] = useState("Friends");

  const [users, setUsers] = useState({
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
    console.log("getReqAndFriendIds: ", typeof userIds, userIds);
    return [...userIds];
  };

  const getUsers = async () => {
    // if (
    //   !state.user.friendRequestsOutgoing &&
    //   !state.user.friendRequests &&
    //   !state.user.friends
    // )
    //   return [];
    console.log("getUsers...");
    setIsLoading(true);
    let userIds = getReqAndFriendIds();

    if (userIds?.length > 0) {
      try {
        await state.primusConnection.write({
          userId: state.user.id,
          action: "GET_USERS",
          payload: userIds
        });
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
  };

  const handleGetUsers = async (data) => {
    let friends = [],
      reqsIn = [],
      reqsOut = [];
    for (let user of data) {
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
  };

  useEffect(() => {
    if (!primus) {
      if (state?.primusConnection) {
        setPrimus(state.primusConnection);
        getUsers();
      }
    }

    if (primus) {
      primus.on("data", async function (data) {
        // console.log(data.action);
        switch (data.action) {
          case "SEND_FRIEND_REQUEST":
            break;
          case "ACCEPT_FRIEND_REQUEST":
            break;
          case "DECLINE_FRIEND_REQUEST":
            break;
          case "GET_USERS":
            handleGetUsers(data.payload);
            break;
          case "FRIEND_SEARCH_RESULTS":
            console.log(data.payload);
            setSearchResults(data.payload);
            break;
          default:
            break;
        }
      });
    }
  }, [primus, state.primusConnection, state.user.friends]);

  const handleFriendSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    // const response = await axios.get(URL_USERS, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
    // let userIds = getReqAndFriendIds();
    // setSearchResults(response.data);
    await state.primusConnection.write({
      userId: state.user.id,
      action: "FRIEND_SEARCH",
      searchTerm: document.getElementById("friend-search-input").value
    });

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

  let tabLabels = [];
  users.friends.length > 0 && tabLabels.push("Friends");
  users.reqsIn.length > 0 && tabLabels.push("Incoming");
  users.reqsOut.length > 0 && tabLabels.push("Outgoing");
  tabLabels.push("Search");

  return (
    <div className="w" style={{ display: "relative" }}>
      {isLoading && <LoadingSpinner />}
      <Tabs
        tabLabels={tabLabels}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Friends" && users.friends.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>FRIENDS</SC.CardBodyTitle>
          <Deck
            users={users.friends}
            btnHandler={handleFriendReq}
            friendStatus="FRIEND"
          />
        </React.Fragment>
      )}
      {activeTab === "Incoming" && users.reqsIn.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>NEW FRIEND REQUESTS</SC.CardBodyTitle>
          <Deck
            users={users.reqsIn}
            btnHandler={handleFriendReq}
            friendStatus="REQ_IN"
          />
        </React.Fragment>
      )}

      {activeTab === "Outgoing" && users.reqsOut.length > 0 && (
        <React.Fragment>
          <SC.CardBodyTitle>PENDING FRIEND REQUESTS</SC.CardBodyTitle>
          <Deck
            users={users.reqsOut}
            btnHandler={handleFriendReq}
            friendStatus="REQ_OUT"
          />
        </React.Fragment>
      )}

      {activeTab === "Search" && (
        <div>
          {searchResults && searchResults?.length > 0 && (
            <div>
              <div>Search Results...</div>

              <Deck
                users={searchResults}
                btnHandler={handleFriendReq}
                friendStatus="STRANGER"
              />
              <div onClick={handleToggleSearch} className="p-1">
                <SC.SmallButton>Clear results</SC.SmallButton>
              </div>
            </div>
          )}

          <div className="d-flex w c">
            <input
              id="friend-search-input"
              type="text"
              aria-label="friend search input"
              placeholder="Friend username or email"
              className="m-1"
            />
            <SC.SmallButton onClick={handleFriendSearch}>
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
        </div>
      )}
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
