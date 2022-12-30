import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    if (req.method === "GET") {
        const post = await client.post.findUnique({
            where: {
                id: Number(req.query.id),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
        });
        const isLike = Boolean(
            await client.like.findFirst({
                where: {
                    postId: post?.id,
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
                    postId: post?.id,
                    userId: token.uid,
                },
                select: {
                    id: true,
                },
            })
        );

        res.json({
            ok: true,
            post,
            isLike,
            isBookmark,
        });
    }
    if (req.method === "DELETE") {
        const existPost = await client.post.findUnique({
            where: {
                id: Number(req.query.id),
            },
        });
        if (!Boolean(existPost))
            res.status(404).json({message: "Not Exist Post"});
        if (existPost.userId !== token.uid)
            res.status(403).json({message: "No Matched UserID"});

        await client.post.delete({where: {id: Number(req.query.id)}});
        res.json({ok: true});
    }
}

export default withHandler({methods: ["GET", "DELETE"], handler});
