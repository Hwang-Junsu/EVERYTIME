import Image from "next/legacy/image";
import {useRouter} from "next/router";

interface IChatItem {
    name: string;
    userId: string;
    lastChat: string;
    lastTimeStamp: string;
    image: string;
}

export default function ChatItem({
    name,
    lastChat,
    userId,
    lastTimeStamp,
    image,
}: IChatItem) {
    const router = useRouter();

    const onEnterChatroom = () => {
        router.push(`/chat/${userId}`);
    };

    return (
        <div
            className=" border-b-2 hover:bg-slate-100"
            onClick={onEnterChatroom}
        >
            <div className="p-3 flex justify-between">
                <div className="px-6">
                    <div className="flex space-x-5">
                        <div className="overflow-hidden w-10 h-10 rounded-full relative">
                            <Image src={image} layout="fill" />
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
