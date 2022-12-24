import Button from "@components/button";
import Layout from "@components/layout";

export default function MyProfile() {
  return (
    <Layout seoTitle="MyProfile" hasTabBar>
      <header className="p-8 space-y-2 border-b-[1px]">
        <section className="flex">
          <div className="w-16 h-16 rounded-full bg-slate-500 mr-8 flex-shrink-0" />
          <div className="space-y-2 w-full">
            <div>
              <p>닉네임</p>
            </div>
            <div className="w-2/3">
              <Button text="프로필 편집" />
            </div>
          </div>
        </section>
        <div className="text-sm font-bold">이메일</div>
      </header>
      <section className="px-3 py-2 border-b-[1px] flex items-center justify-center mb-1">
        <table className="w-full">
          <thead className="">
            <tr className="text-center text-gray-500 text-sm">
              <th>게시글</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="grid grid-rows-3 grid-cols-3 gap-1">
        {[1, 2, 3, 4, 5].map((el) => (
          <div key={el} className="bg-slate-300 h-36"></div>
        ))}
      </section>
    </Layout>
  );
}
