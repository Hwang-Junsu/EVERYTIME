import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Message from "./message";

export default function ChatLog({ socket, user }) {
  const [msgList, setMsgList] = useState([]);

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
    <div className="h-[84vh] p-5 space-y-3">
      {msgList.map((msg) => (
        <Message
          key={uuid()}
          isMine={msg.userId === user?.id}
          userName={msg.userName}
          userImage={msg.image}
          timeStamp={msg.timeStamp}
          msg={msg.msg}
        />
      ))}
    </div>
  );
}
