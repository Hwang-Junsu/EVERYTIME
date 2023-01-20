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
    title = "JUNSTAGRAM",
}: LayoutProps) {
    const router = useRouter();
    const {data} = useSession();
    const onClick = () => {
        router.back();
    };

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <Head>
                    <title>{`${seoTitle} | JUNSTAGRAM`}</title>
                </Head>
                <div className="fixed top-0 z-50 flex items-center justify-center w-full h-12 max-w-xl px-10 text-lg font-medium text-gray-800 bg-white border-b">
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
                            "w-full flex",
                            title === "JUNSTAGRAM"
                                ? "justify-between"
                                : "justify-center"
                        )}
                    >
                        <Link href={"/"}>
                            <span
                                className={cls(
                                    canGoBack ? "mx-auto" : "",
                                    " tracking-tighter font-titleFont cursor-pointer"
                                )}
                            >
                                {title}
                            </span>
                        </Link>
                        {title === "JUNSTAGRAM" ? (
                            <span
                                className="cursor-pointer"
                                onClick={() => router.push("/settings")}
                            >
                                <CogIcon />
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>
                    {children}
                </div>
                {hasTabBar ? (
                    <nav className="fixed bottom-0 flex justify-between w-full max-w-xl px-10 pt-3 pb-5 text-xs text-gray-700 bg-white border-t">
                        <Link href="/">
                            <span
                                className={cls(
                                    "flex flex-col items-center space-y-2 ",
                                    router.pathname === "/"
                                        ? "text-blue-500"
                                        : "hover:text-gray-500 transition-colors"
                                )}
                            >
                                <HomeIcon />
                            </span>
                        </Link>
                        <div
                            role="presentation"
                            onClick={() => setIsOpen((props) => !props)}
                        >
                            <span>
                                <AddIcon />
                            </span>
                        </div>
                        <Link href="/chat">
                            <span
                                className={cls(
                                    "flex flex-col items-center space-y-2 ",
                                    router.pathname === "/chat"
                                        ? "text-blue-500"
                                        : "hover:text-gray-500 transition-colors"
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
                                        ? "text-blue-500"
                                        : "hover:text-gray-500 transition-colors"
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
