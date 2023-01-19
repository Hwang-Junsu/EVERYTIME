import ChatAddModal from "@components/chat/chatAddModal";
import ChatItem from "@components/chat/chatItem";
import Layout from "@components/common/layout";
import {api} from "@libs/api";
import useUser from "hooks/useUser";
import {useState} from "react";
import {useQuery} from "react-query";

export default function Chat() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {data} = useQuery(["chat"], () => api.get("/api/chat"));
    const {user} = useUser();

    return (
        <Layout seoTitle="Chat" hasTabBar>
            {isOpen ? (
                <ChatAddModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    sendUserList={user?.sendFollow}
                    receiveUserList={user?.receiveFollow}
                />
            ) : null}
            <div
                className="h-12 flex justify-center items-center hover:bg-blue-400 text-lg font-bold border-b-2"
                onClick={() => setIsOpen((props) => !props)}
            >
                채팅 추가하기 +
            </div>
            {data?.data?.chatrooms.map((chat) => {
                const counterMember =
                    chat.chatroom.members[0].user.id === user?.id
                        ? chat.chatroom.members[1]
                        : chat.chatroom.members[0];

                return (
                    <ChatItem
                        key={chat.chatroom.id}
                        chatroomId={chat.chatroom.id}
                        name={counterMember.user.name}
                        image={counterMember.user.image}
                        lastChat={
                            chat.chatroom.message.length === 0
                                ? []
                                : chat.chatroom.message[
                                      chat.chatroom.message.length - 1
                                  ].message
                        }
                        lastTimeStamp={
                            chat.chatroom.message.length === 0
                                ? []
                                : chat.chatroom.message[
                                      chat.chatroom.message.length - 1
                                  ].timeStamp
                        }
                    />
                );
            })}
        </Layout>
    );
}
