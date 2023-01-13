import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  // if (!token) res.status(403).json({message: "Not Login"});

  const {
    query: { id },
  } = req;
  if (req.method === "GET") {
    const user = await client.user.findUnique({
      where: { id: String(id) },
      select: {
        image: true,
        id: true,
        name: true,
        email: true,
        introduce: true,
        sendFollow: {
          select: {
            receiveUser: {
              select: {
                name: true,
                id: true,
                image: true,
              },
            },
          },
        },
        receiveFollow: {
          select: {
            sendUser: {
              select: {
                name: true,
                id: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            bookmark: true,
            post: true,
            sendFollow: true,
            receiveFollow: true,
          },
        },
      },
    });
    if (user.id !== token.uid) {
      const isFollow = Boolean(
        await client.follow.findFirst({
          where: {
            sendUserId: token.uid,
            receiveUserId: user.id,
          },
        })
      );
      res.json({ ok: true, user, isFollow });
    } else {
      res.json({ ok: true, user });
    }
  }

  if (req.method === "PATCH") {
    const {
      body,
      query: { id },
    } = req;
    const user = await client.user.findUnique({
      where: { id: String(id) },
    });
    if (user.id !== token.uid)
      res.status(403).json({ message: "No Matched UserId" });

    const updatedUser = await client.user.update({
      where: {
        id: String(id),
      },
      data: {
        image: body.image || user.image,
        name: body.name || user.name,
        introduce: body.introduce || user.introduce,
      },
    });

    res.json({ ok: true, data: updatedUser });
  }
}

export default withHandler({ methods: ["GET", "PATCH"], handler });
