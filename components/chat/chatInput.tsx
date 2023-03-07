import {useForm} from "react-hook-form";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import Button from "@components/common/button";
import {db} from "@libs/firebase/firebase";

const ChatInput = ({user, chatroomId}) => {
  const {register, handleSubmit, setValue} = useForm();
  const onValid = async (data: {chatMessage: string}) => {
    await addDoc(collection(db, `messages-${chatroomId}`), {
      name: user?.name,
      userId: user?.id,
      message: data.chatMessage,
      createdAt: Date.now(),
    });
    await updateDoc(doc(db, "chatrooms", chatroomId), {
      lastMessage: data.chatMessage,
      lastTimeStamp: Date.now(),
    });

    setValue("chatMessage", "");
  };
  return (
    <div className="w-full py-2">
      <form
        className="flex items-center w-full px-5 space-x-3"
        onSubmit={handleSubmit(onValid)}
      >
        <input
          placeholder="메시지를 입력하세요."
          {...register("chatMessage", {required: true})}
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
