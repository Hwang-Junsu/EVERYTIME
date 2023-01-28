import Button from "@components/common/button";
import { db } from "@libs/firebase/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
const ChatInput = ({ user, chatroomId }) => {
  const [chatMessage, setChatMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `messages-${chatroomId}`), {
      name: user?.name,
      userId: user?.id,
      message: chatMessage,
      createdAt: Date.now(),
    });
    await updateDoc(doc(db, "chatrooms", chatroomId), {
      lastMessage: chatMessage,
      lastTimeStamp: Date.now(),
    });

    setChatMessage("");
  };
  return (
    <div className="w-full py-2">
      <form
        className="flex items-center w-full px-5 space-x-3"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="메시지를 입력하세요."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          className="flex-grow px-3 py-2 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></input>
        <div>
          <Button text="보내기" />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
