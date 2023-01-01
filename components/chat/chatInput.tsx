import Button from "@components/button";
import React, {useRef, useState} from "react";
const ChatInput = ({userName, socket}) => {
    const [chatMessage, setChatMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("onSend", {
            userName: userName ? userName : "NoName",
            msg: chatMessage,
            timeStamp: new Date().toLocaleTimeString(),
        });
        setChatMessage("");
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
