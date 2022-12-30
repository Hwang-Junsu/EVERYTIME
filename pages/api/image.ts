import {getToken} from "next-auth/jwt";
import {NextApiRequest, NextApiResponse} from "next";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    const response = await (
        await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_CLIENT_ID}/images/v1/direct_upload`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                },
            }
        )
    ).json();
    res.json({
        ok: true,
        ...response.result,
    });
}

export default withHandler({
    methods: ["GET"],
    handler,
});
