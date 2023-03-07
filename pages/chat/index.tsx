import {useEffect, useState} from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {db} from "@libs/firebase/firebase";
import ChatAddModal from "@components/chat/chatAddModal";
import ChatItem from "@components/chat/chatItem";
import Layout from "@components/common/layout";
import useUser from "hooks/useUser";

export default function Chat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatroomList, setChatroomList] = useState<DocumentData[]>([]);
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      const chatroomRef = query(
        collection(db, "chatrooms"),
        orderBy("lastTimeStamp", "desc"),
        where("members", "array-contains", user.id)
      );
      onSnapshot(chatroomRef, (querySnapshot) => {
        setChatroomList(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [user]);

  return (
    <Layout seoTitle="Chat" hasTabBar>
      {isOpen ? (
        <ChatAddModal
          readonly={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          sendUserList={user?.sendFollow}
          receiveUserList={user?.receiveFollow}
        />
      ) : null}
      <div
        className="flex items-center justify-center h-12 text-lg font-bold border-b-2 hover:bg-blue-400"
        onClick={() => setIsOpen((props) => !props)}
      >
        채팅 추가하기 +
      </div>
      {chatroomList &&
        chatroomList.map((chat) => {
          if (chat.to === user?.id) {
            return (
              <ChatItem
                key={chat.id}
                chatroomId={chat.id}
                userId={chat.from}
                lastChat={chat.lastMessage}
                lastTimeStamp={chat.lastTimeStamp}
              />
            );
          } else {
            return (
              <ChatItem
                key={chat.id}
                chatroomId={chat.id}
                userId={chat.to}
                lastChat={chat.lastMessage}
                lastTimeStamp={chat.lastTimeStamp}
              />
            );
          }
        })}
    </Layout>
  );
}
