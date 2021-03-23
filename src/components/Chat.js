import React, { useContext, useEffect, useState } from "react";

import { store } from "../data/store";

import { ChatRoom } from "./ChatRoom";
import { BubbleWPortrait } from "./Bubble";
import { getRandomPortrait } from "../data/charNetworkConnections";

import * as SC from "../styled";

// const URL_PRIMUS_CONNECTION =
//   'https://character-companion.glitch.me/api/chat/connect';

// let primus = new Primus(URL_PRIMUS_CONNECTION);

const sampleChatRoom = {
  id: 1,
  name: "The Green Dragon",
  image: getRandomPortrait("The Green Dragon"),
  label: "Public Tavern",
  description: "The only brew for the brave and true...."
};

export const ChatMessages = ({ messages }) => {
  if (!messages) return "";

  // console.log(messages);

  return (
    <div className="m-1 p-1 bdr-t bdr-l bdr-r bdr-b">
      {messages.length > 0 &&
        messages.map((message, messageId) => {
          // console.log(messageId, message);
          return (
            <div key={messageId}>
              {message[0]}: {message[1]}
            </div>
          );
        })}
    </div>
  );
};

export const Chat = () => {
  const { state, dispatch } = useContext(store);
  const [name, setName] = useState(state.user.userName || "Guest");

  const [roomList, setRoomList] = useState(null);
  const [room, setRoom] = useState(-1);
  const [newMessage, setNewMessage] = useState("");
  const [primus, setPrimus] = useState(state.primusConnections[0]);
  const [inRooms, setInRooms] = useState([]);

  useEffect(() => {
    if (state.user.id && primus) {
      console.log("getting rooms...", {
        action: "GET_ROOMS",
        id: state.user.id
      });
      console.log(primus);
      console.log(state);

      primus.write({ action: "GET_ROOMS", id: state.user.id });
    }
    primus.on("data", function message(data) {
      switch (data.action) {
        case "GET_ROOMS":
          console.log("GET_ROOMS", data.payload);
          setRoomList(data.payload);
          console.log(data.payload);
          break;
        case "JOIN":
          console.log("JOIN", data.payload);
          setRoom(data.payload);
          break;
        case "NEW_MESSAGE":
          console.log("NEW_MESSAGE", data.payload);
          setRoom(data.payload);
          break;
        default:
          break;
      }
    });
    primus.on("error", function error(err) {
      console.error("Something horrible has happened", err.stack);
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
      console.log("The reconnection failed: %s", err.message);
    });
    primus.on("end", function () {
      console.log("Connection closed");
    });
  }, [primus, state.user.id]);

  const handleJoin = async (e, id) => {
    console.log(`${name} joining chat room. Room id: ${id}`);
    primus.write({ action: "JOIN", room: id });
    let newInRooms = [...inRooms, id];
    setInRooms(newInRooms);
  };

  const handleLeave = async (e, id) => {
    primus.write({ action: "LEAVE", room: id });
    let newInRooms = inRooms.filter((room) => room !== id);
    setInRooms(newInRooms);
  };

  return (
    <SC.Card>
      <SC.CardHeader>CHAT</SC.CardHeader>

      <div id="chatCategories">
        <div>
          {roomList?.length > 0 &&
            roomList.map((room) => (
              <div className="">
                <BubbleWPortrait
                  onClick={(e) => handleJoin(room.id)}
                  key={room.id}
                  name={room.name}
                  image={sampleChatRoom.image}
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
            ))}
        </div>
      </div>
    </SC.Card>
  );
};