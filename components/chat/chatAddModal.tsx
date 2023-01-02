import { api } from "@libs/api";
import { cls } from "@libs/utils";
import Image from "next/legacy/image";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

interface IAddChatModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sendUserList: any;
  receiveUserList: any;
}

export default function ChatAddModal({
  isOpen,
  setIsOpen,
  sendUserList,
  receiveUserList,
}: IAddChatModalProps) {
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  const { mutate } = useMutation(
    ({ userId }: { userId: string }) => api.post("/api/chat", { userId }),
    {
      onError: () => Swal.fire("이미 채팅을 이용중입니다."),
    }
  );
  const onAddChat = (userId: string) => {
    mutate({ userId });
    setIsOpen((props) => !props);
  };

  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed z-[999] top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="presentation"
            className={cls(
              `p-5 w-[380px] h-[650px] bg-white rounded-md overflow-hidden
`
            )}
          >
            <header className="text-lg font-bold tracking-wider border-b-2 p-2 text-center">
              채팅추가
            </header>
            <div className="text-center mt-2 font-bold text-lg border-b-2">
              팔로우한 유저
            </div>
            <ul className="w-full divide-y-2">
              {sendUserList.map((user) => (
                <li key={user.receiveUser.id} className="py-3 px-10">
                  <div className="flex justify-between items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={user.receiveUser.image}
                        layout="fill"
                        alt="profileImage"
                        className=" object-cover"
                      />
                    </div>
                    <div className="font-bold">{user.receiveUser.name}</div>
                    <div onClick={() => onAddChat(user.receiveUser.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-center mt-2 font-bold text-lg  border-b-2">
              팔로잉한 유저
            </div>
            <ul className="w-full divide-y-2">
              {receiveUserList.map((user) => (
                <li key={user.sendUser.id} className="py-3 px-10">
                  <div className="flex justify-between items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={user.sendUser.image}
                        layout="fill"
                        alt="profileImage"
                        className=" object-cover"
                      />
                    </div>
                    <div className="font-bold">{user.sendUser.name}</div>
                    <div onClick={() => onAddChat(user.sendUser.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
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
