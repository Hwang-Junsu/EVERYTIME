import { api } from "@libs/api";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Scrollbars } from "react-custom-scrollbars";
import Message from "./message";

export default function ChatLog({ socket, user, chatroomId }) {
  const [msgList, setMsgList] = useState([]);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const newChatList = api.get(`/api/chat/${chatroomId}`);
    newChatList.then((data) => {
      setMsgList(data?.data?.chatroom?.message);
    });
  }, []);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [msgList]);
  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 150);
  }, []);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div id="chatting" className="p-3 h-[75vh] lg:h-[85vh]">
      <Scrollbars ref={scrollbarRef} autoHide>
        <div
          id="chatting"
          className="space-y-3 overflow-y-scroll scrollbar-none"
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
      </Scrollbars>
    </div>
  );
}
