import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({req, secret});
  if (!token) res.status(403).json({message: "Not Login"});

  if (req.method === "GET") {
    const findBookmarkPosts = await client.bookmark.findMany({
      where: {
        userId: token.uid,
      },
      select: {
        post: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    const bookmarkPosts = findBookmarkPosts.map((post) => post.post);
    res.json({
      ok: true,
      allPosts: bookmarkPosts,
    });
  }
}

export default withHandler({methods: ["GET"], handler});
