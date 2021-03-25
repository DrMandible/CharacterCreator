import React, { useState, useContext, useEffect } from "react";
import { store } from "../data/store";

import * as SC from "../styled";

export const ChatRoom = ({ room, primus }) => {
  const { state, dispatch } = useContext(store);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(null);
  // console.log(messages);
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
    console.log("room: ", room);
    if (primus) {
      primus.on("data", function message(data) {
        switch (data.action) {
          case "NEW_MESSAGE":
            console.log("ChatRoom - NEW_MESSAGE", data.payload);
            // if (data.room === room.id) {
            let newMessages = JSON.parse(data.payload.logs);
            console.log("newMessages", data.payload);

            setMessages(newMessages);
            // }
            break;

          default:
            break;
        }
      });
    }
  }, [primus, room]);

  return (
    <SC.Card>
      {room && (
        <div key={room.name}>
          {/* <ChatMessages messages={messages} /> */}
          {room.logs &&
            Object.entries(room.logs).map(([messageIndex, messageData]) => {
              console.log("messageData", messageData);
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
  // console.log(messagetext, userName, messageId, onClick);
  return (
    <div onClick={() => onClick(messageId)}>
      <b>{userName}:</b> {messagetext}
    </div>
  );
});
