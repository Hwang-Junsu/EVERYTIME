import {NextApiRequest, NextApiResponse} from "next";
import withHandler, {ResponseType} from "@libs/server/withHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const maxDurationSeconds = 3600;
    const thumbnailTimestampPct = 0.529241;
    const data = {maxDurationSeconds, thumbnailTimestampPct};
    const body = JSON.stringify(data);
    const response = await (
        await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_CLIENT_ID}/stream/direct_upload`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
                },
                body,
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
