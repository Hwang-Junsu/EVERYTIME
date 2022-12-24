import Layout from "@components/layout";

export default function Chat() {
  return (
    <Layout seoTitle="Chat" hasTabBar>
      {[1, 2, 3, 4, 5].map((el) => (
        <div key={el} className=" border-b-2 hover:bg-slate-100">
          <div className="p-3 flex justify-between">
            <div className="px-6">
              <div className="flex space-x-5">
                <div className="bg-slate-500 w-10 h-10 rounded-full" />
                <div>
                  <div>닉네임</div>
                  <div>최근 채팅 내용</div>
                </div>
              </div>
            </div>
            <time className="text-sm text-gray-500">1시간 전</time>
          </div>
        </div>
      ))}
    </Layout>
  );
}
