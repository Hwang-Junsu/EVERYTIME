import React, { useState } from "react";
import Link from "next/link";
import { cls } from "@libs/utils";
import { useRouter } from "next/router";
import Head from "next/head";
import AddModal from "../modals/addModal";
import { CogIcon, Chevron } from "@components/svg";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { ILayoutProps } from "types/types";

export default function Layout({
  canGoBack,
  hasTabBar,
  children,
  seoTitle,
  title = "EVERYTIME",
}: ILayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full max-w-xl min-h-screen mx-auto">
        <Head>
          <title>{`${seoTitle} | EVERYTIME`}</title>
        </Head>
        <div className="fixed lg:hidden z-[999] bg-gradient-to-r from-indigo-400 to-indigo-600 top-0 flex items-center justify-center w-full h-16 max-w-xl px-10 text-lg font-medium text-gray-800 bg-white border-b">
          {canGoBack ? (
            <button
              onClick={onClick}
              className="absolute cursor-pointer left-4"
            >
              <Chevron />
            </button>
          ) : null}
          <div
            className={cls(
              "w-full flex text-white",
              title === "EVERYTIME" ? "justify-between" : "justify-center"
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
        <div className={cls("lg:pt-0 pt-16", hasTabBar ? "lg:pb-0 pb-16" : "")}>
          {children}
        </div>
        {hasTabBar ? (
          <>
            <Sidebar />
            <Navbar />
          </>
        ) : null}
      </div>
      {isOpen ? <AddModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
