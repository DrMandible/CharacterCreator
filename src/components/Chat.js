import React, { useContext, useEffect, useState } from "react";

import { store } from "../data/store";

import { getRandomPortrait } from "../data/charNetworkConnections";

import * as SC from "../styled";

const getRoomName = (userRooms, roomId) => {
  for (let room of userRooms) {
    if (room.id === roomId) return room.name;
  }
};

const handleDestroyRoom = async (primus, id) => {
  console.log("destroying room: ", id);
  primus.write({ action: "DESTROY_ROOMS", rooms: [id] });
};

export const handleSendMessage = async (
  primus,
  userName,
  userId,
  roomId,
  newMessage
) => {
  primus.write({
    id: userId,
    action: "NEW_MESSAGE",
    roomId: roomId,
    message: newMessage,
    userId: userId,
    userName: userName
  });
  document.getElementById("message-input").value = "";
};

export const Chat = () => {
  const { state, dispatch } = useContext(store);
  const [primus, setPrimus] = useState(null);

  const [userRooms, setUserRooms] = useState(null);
  const [joinedChats, setJoinedChats] = useState(null);
  const [chatLogs, setChatLogs] = useState(null);

  const [activeChatRoom, setActiveChatRoom] = useState(null);

  const [showChatList, setShowChatList] = useState(true);

  const handleSetActiveChat = async (roomId) => setActiveChatRoom(roomId);

  const handleHideChatList = () => setShowChatList(false);
  const handleShowChatList = () => setShowChatList(true);

  const handleJoin = async (e, roomId) => {
    primus.write({ action: "JOIN", roomId: roomId, userId: state.user.id });
    setActiveChatRoom(roomId);
  };

  const handleCreateRoom = async () => {
    console.log("creating room...");
    state.primusConnection.write({
      userId: state.user.id,
      action: "CREATE_ROOM",
      roomName: "Pistol Pete's",
      roomType: "Public Tavern"
    });
  };

  const getRooms = async () => {
    return await primus.write({
      action: "GET_ROOMS",
      id: state.user.id,
      filter: []
    });
  };

  useEffect(() => {
    if (!primus) {
      if (state?.primusConnection) {
        // console.log(state.primusConnection);
        setPrimus(state.primusConnection);
      }
    }

    if (!joinedChats) {
      setJoinedChats(state.user.joinedChats);
    }

    if (primus) {
      if (!userRooms) {
        getRooms();
      }
      primus.on("data", async function (data) {
        // console.log(data.action);
        switch (data.action) {
          case "GET_ROOMS":
            // console.log("GET_ROOMS", data.payload);
            setUserRooms(data.payload);
            break;
          case "JOIN":
            // console.log("JOIN", data.payload);
            await dispatch({
              type: "UPDATE_JOINED_CHATS",
              payload: data.payload
            });
            setShowChatList(false);
            break;

          case "LEAVE":
            await dispatch({
              type: "UPDATE_JOINED_CHATS",
              payload: data.payload
            });
            await getRooms();
            break;
          case "NEW_CHAT_LOGS":
            // console.log("data.logs", typeof data.logs, data.logs);
            let newChatLogs = data.logs;
            // console.log("newChatLogs", typeof newChatLogs, newChatLogs);
            setChatLogs(newChatLogs);
            break;
          default:
            break;
        }
      });
    }
  }, [primus, state.primusConnection]);

  if (!userRooms) return <></>;
  // console.log(userRooms);
  getRoomName(userRooms, 60);
  return (
    <div
      style={{ position: "relative", height: "70vh", boxSizing: "border-box" }}
      className="d-flex w"
    >
      {showChatList ? (
        <ChatList
          primus={primus}
          list={userRooms}
          handleJoin={handleJoin}
          handleSetActiveChat={handleSetActiveChat}
        >
          <SC.SmallButton onClick={handleCreateRoom}>
            Create Room
          </SC.SmallButton>
        </ChatList>
      ) : (
        <SC.SmallButton
          style={{
            width: "4rem",
            height: "1.5rem",
            position: "absolute",
            top: "-.5rem",
            right: "-.5rem"
          }}
          onClick={handleShowChatList}
        >
          Chats
        </SC.SmallButton>
      )}

      {primus && activeChatRoom && (
        <div
          onClick={handleHideChatList}
          style={{
            width: "100%",
            bottom: 0,
            boxSizing: "border-box"
          }}
        >
          <ChatRoom
            primus={primus}
            roomName={getRoomName(userRooms, activeChatRoom)}
            room={activeChatRoom}
            userId={state.user.id}
            userName={state.user.userName}
            handleSendMessage={handleSendMessage}
            chatLogs={chatLogs}
          >
            {chatLogs &&
              chatLogs.map((log) => {
                // console.log("log", typeof log, log);
                return (
                  <div className="d-flex f-a-s" key={log.id}>
                    <div style={{ whiteSpace: "nowrap" }}>
                      <b>{`${log.userName}: `}</b>
                    </div>
                    <div style={{ marginLeft: "0.1rem" }}>{log.message}</div>
                  </div>
                );
              })}
          </ChatRoom>
        </div>
      )}
    </div>
  );
};

const ChatRoom = (props) => {
  const [lastKey, setLastKey] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    if (lastKey && lastKey === 13) {
      props.handleSendMessage(
        props.primus,
        props.userName,
        props.userId,
        props.room,
        newMessage
      );
      setLastKey(null);
    }
  }, [lastKey]);

  const handleKey = (e) => {
    setNewMessage(e.target.value);
    setLastKey(e.keyCode);
  };
  return (
    <div className="w">
      <b className="bdr-b">{props.roomName}</b>
      {props.children}
      {/* {props.chatLogs && <ChatLogs chatLogs={props.chatLogs} />} */}
      <div className="d-flex" style={{ marginTop: "0.2rem" }}>
        <input
          id="message-input"
          onKeyDown={(e) => handleKey(e)}
          style={{
            flexGrow: 1
          }}
        />
        <div>
          {/* *** TOGGLE SEND MESSAGE OUT-OF-CHARACTER || IN-CHARACTER *** */}
          {/* <select defaultValue={state.user.userName}>
            <option>{state.user.userName}</option>
            <option>{state.user.character.name}</option>
          </select> */}
          <SC.SmallButton
            onClick={(e) =>
              props.handleSendMessage(
                props.primus,
                props.userName,
                props.userId,
                props.room,
                newMessage
              )
            }
            style={{ maxWidth: "4rem" }}
          >
            Send
          </SC.SmallButton>
        </div>
      </div>
    </div>
  );
};

const ChatList = (props) => {
  const list = props.list;
  const handleJoin = props.handleJoin;
  return (
    <div
      style={{
        width: "85%",
        position: "absolute",
        right: "-.2rem"
      }}
    >
      {props.children}
      {list.map((room) => (
        <div className="d-flex f-a-s w p-1" key={room.id}>
          <SC.SmallButton onClick={(e) => handleJoin(e, room.id)}>
            <div className="d-flex f-a-s w">
              <div className="f-a-s">
                <SC.SmallIcon>
                  <img src={getRandomPortrait(room.name)} alt={room.name} />
                </SC.SmallIcon>
              </div>
              <p className="f-a-s w">{room.name}</p>
            </div>
          </SC.SmallButton>

          {/* *** DESTROY ROOM *** */}
          {/* <SC.SmallButton
            style={{
              margin: 0,
              padding: 0,
              minHeight: "1.5rem",
              height: "1.5rem",
              width: "1.5rem",
              minWidth: "1.5rem"
            }}
            onClick={(e) => handleDestroyRoom(props.primus, room.id)}
          >
            <div
              className="tc"
              style={{
                margin: 0,
                padding: 0
              }}
            >
              <span role="img" aria-label="Delete Room">
                ❌
              </span>
            </div>
          </SC.SmallButton> */}
        </div>
      ))}
    </div>
  );
};
