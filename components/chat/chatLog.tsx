import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Scrollbars } from "react-custom-scrollbars";
import Message from "./message";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@libs/firebase/firebase";

export default function ChatLog({ user, chatroomId }) {
  const [msgList, setMsgList] = useState([]);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const messagesRef = query(
      collection(db, `messages-${chatroomId}`),
      orderBy("createdAt", "asc"),
      limit(1000)
    );
    onSnapshot(messagesRef, (querySnapshot) => {
      setMsgList(querySnapshot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  useEffect(() => {
    scrollbarRef.current?.scrollToBottom();
  }, [msgList]);
  useEffect(() => {
    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 1000);
  }, []);

  return (
    <div id="chatting" className="p-3 h-[75vh] lg:h-[85vh]">
      <Scrollbars ref={scrollbarRef} autoHide>
        <div
          id="chatting"
          className="space-y-3 overflow-y-scroll scrollbar-none"
        >
          {msgList.map((msg) => {
            if (msg.message === "") return;
            return (
              <Message
                key={uuid()}
                isMine={msg.userId === user?.id}
                userId={msg.userId}
                timeStamp={msg.createdAt}
                msg={msg.message}
              />
            );
          })}
        </div>
      </Scrollbars>
    </div>
  );
}
