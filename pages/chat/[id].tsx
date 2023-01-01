import React, {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import ChatInput from "@components/chat/chatInput";
import ChatLog from "@components/chat/chatLog";
import Layout from "@components/layout";
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
                userName: user?.name || "NoName",
            };
            currentSocket.on("connect", () => {
                currentSocket.emit("join", myInfo);
            });
        }
    }, [currentSocket]);

    return (
        <Layout seoTitle="ChatRoom">
            <div>
                {currentSocket ? (
                    <>
                        <ChatLog socket={currentSocket}></ChatLog>
                        <ChatInput
                            userName={user?.name || "NoName"}
                            socket={currentSocket}
                        ></ChatInput>
                    </>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </Layout>
    );
}
