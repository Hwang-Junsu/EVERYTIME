import React from "react";
import ChatInput from "@components/chat/chatInput";
import ChatLog from "@components/chat/chatLog";
import Layout from "@components/common/layout";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { user } = useUser();

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
        <div>
          <ChatLog user={user} chatroomId={router.query.id}></ChatLog>
          <ChatInput user={user} chatroomId={router.query.id} />
        </div>
      </div>
    </Layout>
  );
}
