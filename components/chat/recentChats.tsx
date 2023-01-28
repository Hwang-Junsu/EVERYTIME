import { db } from "@libs/firebase/firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";
import RecentChatItem from "./recentChatItem";

export default function RecentChats() {
  const [chatroomList, setChatroomList] = useState<DocumentData[]>([]);
  const { user } = useUser();

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
    <>
      {chatroomList && (
        <section className="px-5 pt-5 space-y-2 overflow-x-auto">
          <p className="text-xl text-bold">Recent Chats</p>
          {chatroomList && (
            <div className="flex p-3 space-x-5 bg-indigo-200 rounded-md justify-items-start">
              {chatroomList.map((chat) => (
                <RecentChatItem
                  key={chat.id}
                  chatroomId={chat.id}
                  userId={chat.to}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
