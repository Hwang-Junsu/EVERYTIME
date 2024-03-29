import Image from "next/legacy/image";
import {useRouter} from "next/router";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import useUser from "hooks/useUser";
import {db} from "@libs/firebase/firebase";
import {cls} from "@libs/utils";
import {IAddChatModalProps} from "types/types";
import PlusIcon from "@components/svg/plusIcon";

export default function ChatAddModal({
  isOpen,
  setIsOpen,
  readonly,
  sendUserList,
  receiveUserList,
}: IAddChatModalProps) {
  const {user} = useUser();
  const router = useRouter();
  const onClick = () => {
    setIsOpen((props) => !props);
  };

  const handleChatting = async (toUser) => {
    const chatroomRef = collection(db, "chatrooms");
    const existChatroom1 = query(
      chatroomRef,
      where("members", "in", [[user.id, toUser.id]])
    );
    const existChatroom2 = query(
      chatroomRef,
      where("members", "in", [[toUser.id, user.id]])
    );
    const chatroomArr = [];
    const snapShot1 = await getDocs(existChatroom1);
    snapShot1.forEach((data) =>
      chatroomArr.push({data: data.data(), id: data.id})
    );
    const snapShot2 = await getDocs(existChatroom2);
    snapShot2.forEach((data) =>
      chatroomArr.push({data: data.data(), id: data.id})
    );

    if (chatroomArr.length > 0) {
      router.push(`/chat/${chatroomArr[0].id}?name=${toUser.name}`);
      return;
    }

    const {id} = await addDoc(chatroomRef, {
      from: user.id,
      to: toUser.id,
      members: [user.id, toUser.id],
      lastMessage: "",
      lastTimeStamp: Date.now(),
    });

    const messagesRef = collection(db, `messages-${id}`);
    await addDoc(messagesRef, {
      message: "",
      createdAt: "",
      name: "",
    });

    router.replace(`/chat/${id}?name=${toUser.name}`);
  };

  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed z-[9999] top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            className={cls(
              `p-5 w-[380px] h-[650px] bg-white rounded-md overflow-hidden
`
            )}
          >
            {!readonly ? (
              <header className="p-2 text-lg font-bold tracking-wider text-center border-b-2">
                채팅추가
              </header>
            ) : null}
            <div className="mt-2 text-lg font-bold text-center border-b-2">
              팔로우한 유저
            </div>
            <ul className="w-full divide-y-2">
              {sendUserList.map((user) => (
                <li key={user.receiveUser.id} className="px-10 py-3">
                  <div className="flex items-center justify-around">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={user.receiveUser.image}
                        layout="fill"
                        alt="profileImage"
                        className="object-cover "
                      />
                    </div>
                    <div className="font-bold">{user.receiveUser.name}</div>
                    {!readonly ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleChatting(user.receiveUser)}
                      >
                        <PlusIcon />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-lg font-bold text-center border-b-2">
              팔로잉한 유저
            </div>
            <ul className="w-full divide-y-2">
              {receiveUserList.map((user) => (
                <li key={user.sendUser.id} className="px-10 py-3">
                  <div className="flex items-center justify-around">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={user.sendUser.image}
                        layout="fill"
                        alt="profileImage"
                        className="object-cover "
                      />
                    </div>
                    <div className="font-bold">{user.sendUser.name}</div>
                    {!readonly ? (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleChatting(user.sendUser)}
                      >
                        <PlusIcon />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
