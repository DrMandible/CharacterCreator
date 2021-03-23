import React, { useState, useContext, useEffect, useMemo } from "react";
import { store } from "../data/store";

import * as SC from "../styled";

export const ChatRoom = ({ room, primus }) => {
  const { state, dispatch } = useContext(store);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(room.chat);

  const handleMessageClick = (id) => {
    console.log("clicked message id: ", id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // console.log(newMessage);
    let res = await primus.write({
      action: "NEW_MESSAGE",
      room: room.id,
      message: [state.user.id, newMessage]
    });
    console.log(res);
    setMessages(res.chat);
    document.getElementById("message-input").value = "";
  };

  const handleTyping = (e) => {
    console.log(e.target.value);
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (primus) {
      primus.on("data", function message(data) {
        switch (data.action) {
          case "GET_ROOMS":
            console.log("GET_ROOMS", data.payload);
            // setRoomList(data.payload);
            console.log(data.payload);
            break;
          case "LEAVE":
            console.log("LEAVE", data.payload);
            // setRoom(data.payload);
            break;
          case "NEW_MESSAGE":
            console.log("NEW_MESSAGE", data.payload);
            setMessages(data.payload.chat);
            break;
          default:
            break;
        }
      });
      primus.on("open", function open() {
        console.log("Connection is alive and kicking");
        primus.write({ action: "GET_ROOMS", id: state.user.id });
      });
      primus.on("connection", function () {
        console.log("primus connected");
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
        // console.log("The reconnection failed: %s", err.message);
      });
      primus.on("end", function () {
        // console.log("Connection closed");
      });
    }
  }, [primus]);

  return (
    <SC.Card>
      {room && (
        <div key={room.name}>
          <div>{room.name}</div>

          {/* <ChatMessages messages={messages} /> */}
          {messages?.map((message) => {
            let userid = message[0];
            let messageText = message[1];
            let messageId = message[2];
            return (
              <Message
                key={messageId}
                onClick={handleMessageClick}
                messagetext={messageText}
                userid={userid}
                messageId={messageId}
              />
            );
          })}
          <form onSubmit={handleSendMessage}>
            <input type="text" id="message-input" onChange={handleTyping} />
            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </SC.Card>
  );
};

const Message = React.memo(({ messagetext, userid, messageId, onClick }) => {
  return (
    <div onClick={() => onClick(messageId)}>
      {userid}: {messagetext}
    </div>
  );
});
