import { api } from "@libs/api";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import Message from "./message";

export default function ChatLog({ socket, user, chatroomId }) {
  const [msgList, setMsgList] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const newChatList = api.get(`/api/chat/${chatroomId}`);
    newChatList.then((data) => {
      console.log(data?.data?.chatroom?.message);
      setMsgList(data?.data?.chatroom?.message);
    });
  }, []);

  useEffect(() => {
    const chatting = document.getElementById("chatting");
    setTimeout(() => {
      chatting.scrollTop = chatting.scrollHeight;
    }, 300);
  }, []);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div
      ref={ref}
      id="chatting"
      className="h-[84vh] p-5 space-y-3 overflow-y-scroll scrollbar-none"
    >
      {msgList.map((msg) => (
        <Message
          key={uuid()}
          isMine={msg.userId === user?.id}
          userName={msg.userName}
          userImage={msg.image}
          timeStamp={msg.timeStamp}
          msg={msg.message}
        />
      ))}
    </div>
  );
}
