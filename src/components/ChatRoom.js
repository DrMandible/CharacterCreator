import React, { useState, useContext } from "react";
import { store } from "../data/store";

import * as SC from "../styled";

export const ChatMessages = ({ messages }) => {
  if (!messages) return "";
  return (
    <div className="m-1 p-1 bdr-t bdr-l bdr-r bdr-b">
      {messages.length > 0 &&
        messages.map((message, messageId) => (
          <div key={messageId}>
            {message[0]}: {message[1]}
          </div>
        ))}
    </div>
  );
};

export const ChatRoom = ({ room, primus }) => {
  const { state, dispatch } = useContext(store);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    primus.write({
      action: "NEW_MESSAGE",
      room: room.id,
      message: [state.user.id, newMessage]
    });
    document.getElementById("message-input").value = "";
  };

  const handleTyping = (e) => {
    console.log(e.target.value);
    setNewMessage(e.target.value);
  };

  return (
    <SC.Card>
      {room && (
        <div key={room.name}>
          <div>{room.name}</div>

          <ChatMessages messages={room.chat} />

          <form onSubmit={handleSendMessage}>
            <input type="text" id="message-input" onChange={handleTyping} />
            <input type="submit" value="Send" />
          </form>
        </div>
      )}
    </SC.Card>
  );
};
