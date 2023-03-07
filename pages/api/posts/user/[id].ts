import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({req, secret});
  if (!token) res.status(403).json({message: "Not Login"});

  if (req.method === "GET") {
    const usersAllPosts = await client.post.findMany({
      where: {
        userId: String(req.query.id),
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      ok: true,
      allPosts: usersAllPosts,
    });
  }
}

export default withHandler({methods: ["GET"], handler});
