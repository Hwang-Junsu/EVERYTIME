import React, {useState} from "react";
import Link from "next/link";
import {cls} from "@libs/utils";
import {useRouter} from "next/router";
import Head from "next/head";
import AddModal from "../modals/addModal";
import {useSession} from "next-auth/react";
import {
    CogIcon,
    Chevron,
    HomeIcon,
    AddIcon,
    ChatIcon,
    ProfileIcon,
} from "@components/svg";

interface LayoutProps {
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
    seoTitle?: string;
    title?: string;
}

export default function Layout({
    canGoBack,
    hasTabBar,
    children,
    seoTitle,
    title = "EVERYTIME",
}: LayoutProps) {
    const router = useRouter();
    const {data} = useSession();
    const onClick = () => {
        router.back();
    };

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className=" min-h-screen">
                <Head>
                    <title>{`${seoTitle} | EVERYTIME`}</title>
                </Head>
                <div className="fixed z-[999] bg-gradient-to-r from-indigo-400 to-indigo-600 top-0 flex items-center justify-center w-full h-16 max-w-xl px-10 text-lg font-medium text-gray-800 bg-white border-b">
                    {canGoBack ? (
                        <button
                            onClick={onClick}
                            className="absolute left-4 cursor-pointer"
                        >
                            <Chevron />
                        </button>
                    ) : null}
                    <div
                        className={cls(
                            "w-full flex text-white",
                            title === "EVERYTIME"
                                ? "justify-between"
                                : "justify-center"
                        )}
                    >
                        <Link href={"/"}>
                            <span
                                className={cls(
                                    canGoBack ? "mx-auto" : "",
                                    " tracking-tighter cursor-pointer text-2xl"
                                )}
                            >
                                {title}
                            </span>
                        </Link>
                        {title === "EVERYTIME" ? (
                            <span
                                className="cursor-pointer"
                                onClick={() => router.push("/settings")}
                            >
                                <CogIcon />
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className={cls("pt-16", hasTabBar ? "pb-24" : "")}>
                    {children}
                </div>
                {hasTabBar ? (
                    <nav className="z-[999] fixed bottom-0 flex justify-between items-center w-full max-w-xl px-10 pt-3 pb-5 text-xs text-white bg-blue-300 border-t">
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
                        <div
                            role="presentation"
                            onClick={() => setIsOpen((props) => !props)}
                        >
                            <span
                                className={cls(
                                    "hover:text-indigo-500 transition-colors"
                                )}
                            >
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
                                    router.asPath ===
                                        `/profile/${data?.user?.id}`
                                        ? "text-indigo-500"
                                        : "hover:text-indigo-500 transition-colors"
                                )}
                            >
                                <ProfileIcon />
                            </span>
                        </Link>
                    </nav>
                ) : null}
            </div>
            {isOpen ? <AddModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
        </>
    );
}
