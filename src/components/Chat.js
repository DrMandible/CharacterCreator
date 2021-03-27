import React, { useContext, useEffect, useState } from "react";

import { store } from "../data/store";

// import { ChatRoom } from "./ChatRoom";
// import { BubbleWPortrait } from "./Bubble";
import { getRandomPortrait } from "../data/charNetworkConnections";

import * as SC from "../styled";

// export const ChatRoomList = (props) => {
//   const [inRooms, setInRooms] = useState([]);
//   const [chatLogs, setChatLogs] = useState({});

//   useEffect(() => {
//     if (props.primus) {
//       props.primus.on("data", function (data) {
//         switch (data.action) {
//           case "JOIN":
//             console.log("ChatRoomList - JOIN", data.payload);
//             let joinedRoom = data.payload;
//             joinedRoom.logs = JSON.parse(data.payload.logs);
//             let joinedRoomId = joinedRoom.id;
//             let newInRooms = [...inRooms, joinedRoom];
//             console.log("newInRooms", newInRooms);

//             setInRooms(newInRooms);
//             break;
//           default:
//             break;
//         }
//       });
//     }
//   });

//   if (!props.chatroomlist) return "";

//   // console.log(props.chatroomlist);

//   const handleJoin = async (e, id) => {
//     props.primus.write({ action: "JOIN", room: id });
//   };

//   const handleLeave = async (e, id) => {
//     props.primus.write({ action: "LEAVE", room: id });
//     let newInRooms = inRooms.filter((room) => room.id !== id);
//     setInRooms(newInRooms);
//   };

//   const handleDestroyRoom = async (e, id) => {
//     console.log("destroying room: ", id);
//     props.primus.write({ action: "DESTROY_ROOMS", rooms: [id] });
//   };

//   return Object.values(props.chatroomlist).map((room) => {
//     // console.log(room);
//     return (
//       <div key={room.id} className="">
//         <BubbleWPortrait
//           onClick={(e) => handleJoin(room.id)}
//           key={room.id}
//           name={room.name}
//           image={getRandomPortrait(room.name)}
//           label={room.type}
//         >
//           <div className="d-flex f-s-b p-1">
//             {!inRooms.map((inRoom) => inRoom.id).includes(room.id) ? (
//               <SC.SmallButton onClick={(e) => handleJoin(e, room.id)}>
//                 ENTER
//               </SC.SmallButton>
//             ) : (
//               <SC.SmallButton onClick={(e) => handleLeave(e, room.id)}>
//                 LEAVE
//               </SC.SmallButton>
//             )}
//             <SC.SmallButton
//               style={{
//                 marginLeft: "0.1rem",
//                 minHeight: "2rem",
//                 width: "2rem",
//                 minWidth: "2rem"
//               }}
//               onClick={(e) => handleDestroyRoom(e, room.id)}
//             >
//               <div className="tc">
//                 <span role="img" aria-label="Delete Room">
//                   ❌
//                 </span>
//               </div>
//             </SC.SmallButton>
//           </div>
//         </BubbleWPortrait>
//         {inRooms.map((room) => {
//           console.log("inRooms.map((room) =>", room);
//           return (
//             <div key={room.id}>
//               <ChatRoom room={room} primus={props.primus} />
//             </div>
//           );
//         })}
//       </div>
//     );
//   });
// };

// export const Chatb = () => {
//   const { state, dispatch } = useContext(store);
//   const [primus, setPrimus] = useState(null);

//   const [roomList, setRoomList] = useState(null);

//   const [showRoomList, setShowRoomList] = useState(true);

//   const handleCreateRoom = async (e) => {
//     console.log("creating room...");
//     state.primusConnection.write({
//       id: state.user.id,
//       action: "CREATE_ROOM",
//       roomName: "JBG's Stone Inn",
//       roomType: "Public Tavern"
//     });
//   };

//   const toggleShowRoomList = () => setShowRoomList(!showRoomList);

//   useEffect(() => {
//     if (!primus) {
//       if (state?.primusConnection) {
//         // console.log(state.primusConnection);
//         setPrimus(state.primusConnection);
//       }
//     }
//     if (primus) {
//       if (!roomList) {
//         console.log("get rooms");
//         primus.write({
//           action: "GET_ROOMS",
//           id: state.user.id
//         });
//       }
//       primus.on("data", function (data) {
//         // console.log(data.action);
//         switch (data.action) {
//           case "GET_ROOMS":
//             // console.log("GET_ROOMS", data.payload);
//             setRoomList(data.payload);
//             break;
//           default:
//             break;
//         }
//       });
//     }
//   }, [primus, state.primusConnection]);

//   return (
//     <SC.Card>
//       <SC.CardHeader>
//         <div className="d-flex f-sb w">
//           <div>CHAT</div>
//           <div>
//             <SC.SmallButton onClick={toggleShowRoomList}>
//               {showRoomList ? "hide room list" : "show room list"}
//             </SC.SmallButton>
//           </div>
//           <div>
//             <SC.SmallButton onClick={handleCreateRoom}>
//               Create room
//             </SC.SmallButton>
//           </div>
//         </div>
//       </SC.CardHeader>
//       {showRoomList && roomList && primus && (
//         <ChatRoomList chatroomlist={roomList} primus={primus} />
//       )}
//     </SC.Card>
//   );
// };

export const Chat = () => {
  const { state, dispatch } = useContext(store);
  const [primus, setPrimus] = useState(null);

  const [userRooms, setUserRooms] = useState(null);
  const [joinedChats, setJoinedChats] = useState(null);
  const [chatLogs, setChatLogs] = useState(null);

  const [activeChatRoom, setActiveChatRoom] = useState([]);

  const [showChatList, setShowChatList] = useState(true);

  const handleSetActiveChat = async (e, roomId) => {
    let newActiveChatRoom = {
      id: roomId
    };
  };

  const handleHideChatList = () => setShowChatList(false);
  const handleShowChatList = () => setShowChatList(true);

  const handleJoin = async (e, roomId) => {
    primus.write({ action: "JOIN", roomId: roomId, userId: state.user.id });
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

  const handleSendMessage = async (e, roomId, newMessage) => {
    e.preventDefault();
    // console.log(newMessage);
    primus.write({
      id: state.user.id,
      action: "NEW_MESSAGE",
      roomId: roomId,
      message: newMessage,
      userId: state.user.id,
      userName: state.user.name
    });
    document.getElementById("message-input").value = "";
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
      console.log(state.user);

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
            console.log("JOIN", data.payload);
            await dispatch({
              type: "UPDATE_JOINED_CHATS",
              payload: data.payload
            });
            break;
          case "LEAVE":
            await dispatch({
              type: "UPDATE_JOINED_CHATS",
              payload: data.payload
            });
            await getRooms();
            break;
          case "NEW_CHAT_LOGS":
            console.log("data.logs", typeof data.logs, data.logs);
            let newChatLogs = data.logs;
            console.log("newChatLogs", typeof newChatLogs, newChatLogs);
            setChatLogs(newChatLogs);
            break;
          default:
            break;
        }
      });
    }
  }, [primus, state.primusConnection]);

  if (!userRooms) return <></>;

  return (
    <div
      style={{ position: "relative", height: "70vh", boxSizing: "border-box" }}
      className="d-flex w"
    >
      <div
        onClick={handleHideChatList}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          boxSizing: "border-box"
        }}
      >
        <ChatRoom
          room={activeChatRoom}
          handleSendMessage={handleSendMessage}
          chatLogs={chatLogs}
        />
      </div>

      {showChatList ? (
        <ChatList
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
          style={{ height: "2rem", position: "absolute", top: 0, right: 0 }}
          onClick={handleShowChatList}
        >
          Chats
        </SC.SmallButton>
      )}
    </div>
  );
};

const ChatRoom = (props) => {
  const [newMessage, setNewMessage] = useState(null);

  const handleTyping = (e) => {
    // console.log(e.target.value);
    setNewMessage(e.target.value);
  };
  return (
    <div className="w">
      {props.chatLogs && <ChatLogs chatLogs={props.chatLogs} />}
      <div className="d-flex">
        <input
          style={{
            flexGrow: 1
          }}
        />
        <SC.SmallButton style={{ maxWidth: "4rem" }}>Send</SC.SmallButton>
      </div>
    </div>
  );
};

const ChatLogs = ({ chatLogs }) => {
  console.log("chatLogs", typeof chatLogs, chatLogs);
  return (
    <div>
      <div
        className="p-1"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        key={chatLogs.id}
      >
        {chatLogs.map((log) => {
          // console.log("log", typeof log, log);
          return (
            <div className="d-flex" key={log.id}>
              <b>{`${log.userName}: `}</b>
              <div style={{ marginLeft: "0.1rem" }}>{log.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChatList = (props) => {
  const list = props.list;
  const handleJoin = props.handleJoin;
  return (
    <div style={{ width: "60%", position: "absolute", right: 0 }}>
      {props.children}
      {list.map((room) => (
        <SC.SmallButton onClick={(e) => handleJoin(e, room.id)} key={room.id}>
          <div className="d-flex f-a-s w">
            <div className="f-a-s">
              <SC.SmallIcon>
                <img src={getRandomPortrait(room.name)} alt={room.name} />
              </SC.SmallIcon>
            </div>
            <label className="f-a-s">{room.name}</label>
            <div className="w" />
          </div>
        </SC.SmallButton>
      ))}
    </div>
  );
};
