import {api} from "@libs/api";
import useUser from "hooks/useUser";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import {useQuery} from "react-query";

export default function RecentChats() {
    const {data} = useQuery(["chat"], () => api.get("/api/chat?count=7"));
    const router = useRouter();
    const {user} = useUser();

    return (
        <section className="px-5 pt-5 space-y-2">
            <p className="text-bold text-xl">Recent Chats</p>
            {data && (
                <div className="flex justify-items-start space-x-5">
                    {data?.data?.chatrooms.map((chat) => {
                        const counterMember =
                            chat.chatroom.members[0].user.id === user?.id
                                ? chat.chatroom.members[1]
                                : chat.chatroom.members[0];
                        return (
                            <div
                                key={chat.chatroom.id}
                                className="flex justify-center items-center flex-col space-y-1"
                                onClick={() =>
                                    router.push({
                                        pathname: `/chat/${chat.chatroom.id}`,
                                        query: {name: counterMember.user.name},
                                    })
                                }
                            >
                                <div className="overflow-hidden relative rounded-full w-16 h-16 cursor-pointer hover:ring-4 ring-offset-2 ring-indigo-400">
                                    <Image
                                        src={counterMember.user.image}
                                        layout="fill"
                                        alt="profile"
                                    />
                                </div>
                                <div className="text-sm">
                                    {counterMember.user.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
