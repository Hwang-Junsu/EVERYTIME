import AddModal from "@components/modals/addModal";
import {
  AddIcon,
  ChatIcon,
  HomeIcon,
  PowerIcon,
  ProfileIcon,
} from "@components/svg";
import { cls } from "@libs/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <nav
        className="z-[999] fixed top-0 left-0 h-screen hidden lg:flex flex-col justify-start space-y-10 w-[250px]
       max-w-xl px-10 pt-3 pb-5 text-xs bg-gradient-to-b text-white from-indigo-400 to-indigo-600 border-t"
      >
        <div className="mt-4 text-3xl tracking-tighter">EVERYTIME</div>
        <Link href="/">
          <span
            className={cls(
              "flex items-center space-x-2",
              router.pathname === "/"
                ? "text-indigo-800"
                : "hover:text-indigo-800 transition-colors"
            )}
          >
            <HomeIcon />
            <div className="text-2xl">홈</div>
          </span>
        </Link>
        <div role="presentation" onClick={() => setIsOpen((props) => !props)}>
          <span
            className={cls(
              "hover:text-indigo-500 transition-colors flex items-center space-x-2"
            )}
          >
            <AddIcon />
            <div className="text-2xl">피드 작성</div>
          </span>
        </div>
        <Link href="/chat">
          <span
            className={cls(
              "flex items-center space-x-2",
              router.pathname === "/chat"
                ? "text-indigo-800"
                : "hover:text-indigo-800 transition-colors"
            )}
          >
            <ChatIcon />
            <div className="text-2xl">채팅</div>
          </span>
        </Link>
        <Link href={`/profile/${data?.user?.id}`}>
          <span
            className={cls(
              "flex items-center space-x-2",
              router.asPath === `/profile/${data?.user?.id}`
                ? "text-indigo-800"
                : "hover:text-indigo-800 transition-colors"
            )}
          >
            <ProfileIcon />
            <div className="text-2xl">프로필 보기</div>
          </span>
        </Link>
        <div onClick={handleSignOut}>
          <span
            className={cls(
              "hover:text-indigo-800 transition-colors flex items-center space-x-3"
            )}
          >
            <PowerIcon />
            <div className="text-2xl">로그아웃</div>
          </span>
        </div>
      </nav>
      {isOpen ? <AddModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
