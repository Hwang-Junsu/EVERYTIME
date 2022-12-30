import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  if (!token) res.status(403).json({ message: "Not Login" });
  const alreadyExists = await client.bookmark.findFirst({
    where: {
      postId: Number(req.query.id),
      userId: token.uid,
    },
  });

  if (alreadyExists) {
    await client.bookmark.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.bookmark.create({
      data: {
        user: {
          connect: {
            id: String(token.uid),
          },
        },
        post: {
          connect: {
            id: Number(req.query.id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler });
