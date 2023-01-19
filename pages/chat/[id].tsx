import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import ChatInput from "@components/chat/chatInput";
import ChatLog from "@components/chat/chatLog";
import Layout from "@components/common/layout";
import useUser from "hooks/useUser";
import {useRouter} from "next/router";

//const socket = socketIOClient("localhost:5000");

export default function Chat() {
    const router = useRouter();
    const {user} = useUser();
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
        >
            <div className="relative w-full">
                {currentSocket ? (
                    <>
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
                    </>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </Layout>
    );
}
