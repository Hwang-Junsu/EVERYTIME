import { api } from "@libs/api";
import { useQuery } from "react-query";

export default function useChatList() {
  const { data, isLoading } = useQuery(["chat"], () => api.get("/api/chat"));

  return {
    chatrooms: data?.data?.chatrooms.sort(
      (aRoom, bRoom) =>
        aRoom.chatroom.message[aRoom.chatroom.message.length - 1].updatedAt -
        bRoom.chatroom.message[bRoom.chatroom.message.length - 1].updatedAt
    ),
    isLoading,
  };
}
