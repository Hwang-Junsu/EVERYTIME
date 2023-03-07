import Layout from "@components/common/layout";
import {signOut} from "next-auth/react";
import {PowerIcon} from "@components/svg";

export default function Settings() {
  const handleSignOut = () => {
    signOut({callbackUrl: "/login"});
  };

  return (
    <Layout canGoBack seoTitle="Settings" title="Settings" hasTabBar>
      <section className="w-full divide-y-2">
        <div
          onClick={handleSignOut}
          className="flex p-3 space-x-3 justify-center hover:bg-indigo-300 cursor-pointer"
        >
          <PowerIcon />
          <div className="text-lg">로그아웃</div>
        </div>
      </section>
    </Layout>
  );
}
