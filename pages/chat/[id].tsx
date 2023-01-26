import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatInput from "@components/chat/chatInput";
import ChatLog from "@components/chat/chatLog";
import Layout from "@components/common/layout";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";

//const socket = socketIOClient("localhost:5000");

export default function Chat() {
  const router = useRouter();
  const { user } = useUser();
  const [currentSocket, setCurrentSocket] = useState<Socket>();
  // const currentSocket: Socket = io("localhost:5000");
  useEffect(() => {
    setCurrentSocket(io("localhost:5000"));
  }, []);

  useEffect(() => {
    if (currentSocket) {
      const myInfo = {
        roomName: router.query.id,
        userName: user?.name,
      };
      currentSocket.on("connect", () => {
        currentSocket.emit("join", myInfo);
      });
    }
  }, [currentSocket]);

  return (
    <Layout
      seoTitle={router.query.name as string}
      title={router.query.name as string}
      canGoBack
      hasTabBar
    >
      <div className="relative w-full h-[83.5vh] lg:h-screen overflow-hidden bg-indigo-200">
        <div className="items-center justify-center hidden w-full h-16 text-2xl text-white bg-gradient-to-r from-indigo-400 to-indigo-600 lg:flex">
          {router.query.name as string}
        </div>
        {currentSocket ? (
          <div>
            <ChatLog
              socket={currentSocket}
              user={user}
              chatroomId={router.query.id}
            ></ChatLog>
            <ChatInput
              user={user}
              chatroomId={router.query.id}
              userName={user?.name || "NoName"}
              socket={currentSocket}
            />
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </Layout>
  );
}
