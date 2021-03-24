import React, { useState, useContext, useEffect, useMemo } from "react";
import { store } from "../data/store";

import * as SC from "../styled";

export const ChatRoom = ({ room, primus }) => {
  const { state, dispatch } = useContext(store);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(room.logs);

  const handleMessageClick = (id) => {
    console.log("clicked message id: ", id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // console.log(newMessage);
    primus.write({
      id: state.user.id,
      action: "NEW_MESSAGE",
      roomId: room.id,
      message: newMessage,
      userId: state.user.id,
      userName: state.user.name
    });
    document.getElementById("message-input").value = "";
  };

  const handleTyping = (e) => {
    // console.log(e.target.value);
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (primus) {
      primus.on("data", function message(data) {
        switch (data.action) {
          case "LEAVE":
            // console.log("LEAVE", data.payload);
            // setRoom(data.payload);
            break;
          case "NEW_MESSAGE":
            if (data.room === room.id) {
              // console.log("NEW_MESSAGE", data.payload);
              let newMessages = {
                ...messages,
                [Object.keys(data.payload)[0]]: Object.values(data.payload)[0]
              };
              setMessages(newMessages);
            }
            break;
          case "JOIN":
            if (data.payload?.id === room.id) {
              // console.log("ChatRoom - JOIN", data.payload.logs);
              setMessages(data.payload.logs);
            }
            break;
          default:
            break;
        }
      });
    }
  }, [primus]);

  return (
    <SC.Card>
      {room && (
        <div key={room.name}>
          {/* <ChatMessages messages={messages} /> */}
          {messages &&
            messages.map((messageData) => {
              // console.log("messageData", messageData);
              return (
                <Message
                  key={messageData.id}
                  onClick={handleMessageClick}
                  messagetext={messageData.message}
                  userName={messageData.userName}
                  messageId={messageData.id}
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

const Message = React.memo(({ messagetext, userName, messageId, onClick }) => {
  return (
    <div onClick={() => onClick(messageId)}>
      <b>{userName}:</b> {messagetext}
    </div>
  );
});
