import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  if (!token) res.status(403).json({ message: "Not Login" });
  if (req.method === "GET") {
    const allPosts = await client.post.findMany({
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    const allPostsIncludeIsLike = await Promise.all(
      allPosts.map(async (post) => {
        const isLike = Boolean(
          await client.like.findFirst({
            where: {
              postId: post.id,
              userId: token.uid,
            },
            select: {
              id: true,
            },
          })
        );
        const isBookmark = Boolean(
          await client.bookmark.findFirst({
            where: {
              postId: post.id,
              userId: token.uid,
            },
            select: {
              id: true,
            },
          })
        );
        return { ...post, isLike, isBookmark };
      })
    );

    res.json({
      ok: true,
      allPosts: allPostsIncludeIsLike,
    });
  }
  if (req.method === "POST") {
    const {
      body: { title, content, media, hashtags, mediaType, thumbnail },
    } = req;

    const newPost = await client.post.create({
      data: {
        title,
        content,
        media,
        hashtags,
        mediaType,
        thumbnail,
        author: (token.name as string) || "NoName",
        user: {
          connect: {
            id: String(token.uid),
          },
        },
      },
    });

    res.json({ ok: true, newPost });
  }
}

export default withHandler({ methods: ["GET", "POST"], handler });
