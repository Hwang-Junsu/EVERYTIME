import Button from "@components/common/button";
import {api} from "@libs/api";
import React, {useState} from "react";
const ChatInput = ({userName, socket, user, chatroomId}) => {
    const [chatMessage, setChatMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.emit("onSend", {
            userName: user.name ? user.name : "NoName",
            message: chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
            userId: user.id,
            image: user.image,
        });
        await api.post(`/api/chat/${chatroomId}`, {
            msg: chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
            image: user.image,
        });
        setChatMessage("");
        const chatting = document.getElementById("chatting");
        chatting.scrollTop = chatting.scrollHeight;
    };

    const onChatMessageChange = (e) => {
        setChatMessage(e.target.value);
    };

    return (
        <div className="w-full p-10 py-2">
            <form
                className="flex items-center w-full space-x-3"
                onSubmit={handleSubmit}
            >
                <input
                    placeholder="메시지를 입력하세요."
                    value={chatMessage}
                    onChange={onChatMessageChange}
                    className="flex-grow px-3 py-2 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></input>
                <div>
                    <Button text="보내기" />
                </div>
            </form>
        </div>
    );
};

export default ChatInput;
