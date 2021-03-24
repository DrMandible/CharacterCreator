import React, { useContext, useEffect, useState } from "react";

import { store } from "../data/store";
import Primus from "../primus/primus.js";

import { ChatRoom } from "./ChatRoom";
import { BubbleWPortrait } from "./Bubble";
import { getRandomPortrait } from "../data/charNetworkConnections";

import * as SC from "../styled";

const URL_PRIMUS_CONNECTION =
  "https://character-companion.glitch.me/api/chat/connect";

export const ChatRoomList = (props) => {
  const [inRooms, setInRooms] = useState([]);

  useEffect(() => {
    if (props.primus) {
      primus.on("data", function (data) {
        switch (data.action) {
          case "JOIN":
            // console.log("ChatRoomList - JOIN", data.payload);
            let joinedRoom = data.payload;
            // joinedRoom.logs = JSON.parse(data.payload.logs);
            let joinedRoomId = joinedRoom.id;
            let newInRooms = [...inRooms, joinedRoomId];
            // console.log("joinedRoom", newInRooms);
            setInRooms(newInRooms);
            break;
          default:
            break;
        }
      });
    }
  });

  if (!props.chatroomlist) return "";

  const CHAT_ROOM_LIST = props.chatroomlist;

  let primus = props.primus;

  // console.log(CHAT_ROOM_LIST);

  const handleJoin = async (e, id) => {
    // console.log(`${name} joining chat room. Room id: ${id}`);
    primus.write({ action: "JOIN", room: id });
    // let newInRooms = [...inRooms, id];
    // setInRooms(newInRooms);
    // console.log("joinedChat", newInRooms);
  };

  const handleLeave = async (e, id) => {
    primus.write({ action: "LEAVE", room: id });
    let newInRooms = inRooms.filter((room) => room !== id);
    setInRooms(newInRooms);
  };

  return Object.values(CHAT_ROOM_LIST).map((room) => (
    <div key={room.id} className="">
      <BubbleWPortrait
        onClick={(e) => handleJoin(room.id)}
        key={room.id}
        name={room.name}
        image={getRandomPortrait(room.name)}
        label={room.type}
      >
        {!inRooms.includes(room.id) ? (
          <SC.SmallButton onClick={(e) => handleJoin(e, room.id)}>
            ENTER
          </SC.SmallButton>
        ) : (
          <SC.SmallButton onClick={(e) => handleLeave(e, room.id)}>
            LEAVE
          </SC.SmallButton>
        )}
      </BubbleWPortrait>
      {inRooms.includes(room.id) && (
        <div>
          <ChatRoom room={room} primus={primus} />
        </div>
      )}
    </div>
  ));
};

export const Chat = () => {
  const { state, dispatch } = useContext(store);
  const [primus, setPrimus] = useState(null);

  const [roomList, setRoomList] = useState(null);

  const handleCreateRoom = async (e) => {
    console.log("creating room...");
    state.primusConnection.write({
      id: state.user.id,
      action: "CREATE_ROOM",
      roomName: "The Green Dragon",
      roomType: "Public Tavern"
    });
  };

  useEffect(() => {
    if (!primus) {
      if (state?.primusConnection) {
        // console.log(state.primusConnection);
        setPrimus(state.primusConnection);
      }
    }
    if (primus) {
      if (!roomList) {
        primus.write({
          action: "GET_ROOMS",
          id: state.user.id
        });
      }
      primus.on("data", function (data) {
        // console.log(data.action);
        switch (data.action) {
          case "GET_ROOMS":
            // console.log("GET_ROOMS", data.payload);
            setRoomList(data.payload);
            break;
          default:
            break;
        }
      });
      primus.on("open", function open() {
        // console.log("Connection is alive and kicking");
      });
      primus.on("connection", function () {
        // console.log("primus connected");
      });
      primus.on("error", function error(err) {
        // console.error("Something horrible has happened", err.stack);
      });
      primus.on("reconnect", function (opts) {
        // console.log("Reconnection attempt started");
      });
      primus.on("reconnect scheduled", function (opts) {
        // console.log("Reconnecting in %d ms", opts.scheduled);
        // console.log("This is attempt %d out of %d", opts.attempt, opts.retries);
      });
      primus.on("reconnected", function (opts) {
        // console.log("It took %d ms to reconnect", opts.duration);
      });
      primus.on("reconnect timeout", function (err, opts) {
        // console.log("Timeout expired: %s", err.message);
      });
      primus.on("reconnect failed", function (err, opts) {
        // console.log("The reconnection failed: %s", err.message);
      });
      primus.on("end", function () {
        // console.log("Connection closed");
      });
    }
  }, [primus]);

  return (
    <SC.Card>
      <SC.CardHeader>
        <div className="d-flex f-sb w">
          <div>CHAT</div>
          <div>
            <button onClick={handleCreateRoom}>Create room</button>
          </div>
        </div>
      </SC.CardHeader>
      {roomList && primus && (
        <ChatRoomList chatroomlist={roomList} primus={primus} />
      )}
    </SC.Card>
  );
};
