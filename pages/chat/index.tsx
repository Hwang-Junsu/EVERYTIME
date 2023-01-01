import ChatAddModal from "@components/chat/chatAddModal";
import ChatItem from "@components/chat/chatItem";
import Layout from "@components/layout";
import {api} from "@libs/api";
import useUser from "hooks/useUser";
import {useRouter} from "next/router";
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
                    userList={user?.receiveFollow}
                />
            ) : null}
            <div onClick={() => setIsOpen((props) => !props)}>
                채팅 추가하기
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
                        lastChat="에엥?"
                        lastTimeStamp="1시간 전"
                    />
                );
            })}
        </Layout>
    );
}
