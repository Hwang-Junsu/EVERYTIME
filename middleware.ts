import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/")) {
    const ua = userAgent(req);
    if (ua?.isBot) {
      return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    }
  }
}
