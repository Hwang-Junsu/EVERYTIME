import Feed from "@components/feed";
import Layout from "@components/layout";

export default function Home() {
    return (
        <Layout seoTitle="Main" hasTabBar>
            <main className="w-full space-y-3 p-7">
                {[1, 2, 3, 4, 5].map((el) => (
                    <Feed key={el} />
                ))}
            </main>
        </Layout>
    );
}
