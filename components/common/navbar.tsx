import AddModal from "@components/modals/addModal";
import { AddIcon, ChatIcon, HomeIcon, ProfileIcon } from "@components/svg";
import { cls } from "@libs/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  return (
    <>
      <nav className="z-[999] fixed bottom-0 h-16 flex justify-between items-center w-full max-w-xl px-10 pt-3 pb-5 text-xs text-white bg-blue-300 border-t lg:hidden">
        <Link href="/">
          <span
            className={cls(
              "flex flex-col items-center space-y-2 ",
              router.pathname === "/"
                ? "text-indigo-500"
                : "hover:text-indigo-500 transition-colors"
            )}
          >
            <HomeIcon />
          </span>
        </Link>
        <div role="presentation" onClick={() => setIsOpen((props) => !props)}>
          <span className={cls("hover:text-indigo-500 transition-colors")}>
            <AddIcon />
          </span>
        </div>
        <Link href="/chat">
          <span
            className={cls(
              "flex flex-col items-center space-y-2 ",
              router.pathname === "/chat"
                ? "text-indigo-500"
                : "hover:text-indigo-500 transition-colors"
            )}
          >
            <ChatIcon />
          </span>
        </Link>
        <Link href={`/profile/${data?.user?.id}`}>
          <span
            className={cls(
              "flex flex-col items-center space-y-2 ",
              router.asPath === `/profile/${data?.user?.id}`
                ? "text-indigo-500"
                : "hover:text-indigo-500 transition-colors"
            )}
          >
            <ProfileIcon />
          </span>
        </Link>
      </nav>{" "}
      {isOpen ? <AddModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
