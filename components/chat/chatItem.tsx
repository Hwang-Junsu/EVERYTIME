import Image from "next/legacy/image";
import {useRouter} from "next/router";

interface IChatItem {
    name: string;
    chatroomId: number;
    lastChat: string;
    lastTimeStamp: string;
    image: string;
}

export default function ChatItem({
    name,
    lastChat,
    chatroomId,
    lastTimeStamp,
    image,
}: IChatItem) {
    const router = useRouter();

    const onEnterChatroom = () => {
        router.push({pathname: `/chat/${chatroomId}`, query: {name}});
    };

    return (
        <div
            className="border-b-2 hover:bg-slate-100"
            onClick={onEnterChatroom}
        >
            <div className="flex justify-between p-3">
                <div className="px-6">
                    <div className="flex space-x-5">
                        <div className="relative w-10 h-10 overflow-hidden rounded-full">
                            <Image src={image} layout="fill" alt="profile" />
                        </div>
                        <div>
                            <div>{name}</div>
                            <div>{lastChat}</div>
                        </div>
                    </div>
                </div>
                <time className="text-sm text-gray-500">{lastTimeStamp}</time>
            </div>
        </div>
    );
}
