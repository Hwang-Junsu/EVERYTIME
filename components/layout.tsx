import React, { useState } from "react";
import Link from "next/link";
import { cls } from "@libs/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import AddModal from "./addModal";

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
        <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
          {canGoBack ? (
            <button onClick={onClick} className="absolute left-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          ) : null}
          <div
            className={cls(
              "w-full flex",
              title === "JUNSTAGRAM" ? "justify-between" : "justify-center"
            )}
          >
            <Link href={"/"}>
              <span
                className={cls(
                  canGoBack ? "mx-auto" : "",
                  " tracking-tighter font-bold"
                )}
              >
                {title}
              </span>
            </Link>
            {title === "JUNSTAGRAM" ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </span>
            ) : null}
          </div>
        </div>
        <div className={cls("pt-12", hasTabBar ? "pb-24" : "")}>{children}</div>
        {hasTabBar ? (
          <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
            <Link href="/">
              <span
                className={cls(
                  "flex flex-col items-center space-y-2 ",
                  router.pathname === "/"
                    ? "text-blue-500"
                    : "hover:text-gray-500 transition-colors"
                )}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
            </Link>
            <div
              role="presentation"
              onClick={() => setIsOpen((props) => !props)}
            >
              <span
                className={cls(
                  "bg-slate-400 ",
                  router.pathname === "/add"
                    ? "text-blue-500"
                    : "hover:text-gray-500 transition-colors"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link href="/me">
              <span
                className={cls(
                  "flex flex-col items-center space-y-2 ",
                  router.pathname === "/me"
                    ? "text-blue-500"
                    : "hover:text-gray-500 transition-colors"
                )}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
      {isOpen ? <AddModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
