import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body || {};
    if (!code)
      return NextResponse.json({ error: "Missing code" }, { status: 400 });

    const CLIENT_ID =
      process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || process.env.INSTAGRAM_APP_ID;
    const CLIENT_SECRET =
      process.env.INSTAGRAM_APP_SECRET ||
      process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET ||
      "";
    const REDIRECT_URI =
      process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI ||
      process.env.INSTAGRAM_REDIRECT_URI ||
      "";

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 },
      );
    }

    const params = new URLSearchParams();
    params.append("client_id", String(CLIENT_ID));
    params.append("client_secret", String(CLIENT_SECRET));
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", String(REDIRECT_URI));
    params.append("code", String(code));

    const res = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: params,
    });

    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });

    console.log("Exchange success", data);
    const access_token = data.access_token;
    const user_id = data.user_id || data.user?.id || null;
    const expires_in = data.expires_in;

    // if (user_id && access_token) {
    //   try {
    //     await upsertUserToken(
    //       String(user_id),
    //       String(access_token),
    //       expires_in,
    //     );
    //   } catch (e) {
    //     // ignore DB errors but continue
    //     console.error("upsertUserToken error", e);
    //   }
    // }

    return NextResponse.json({ access_token, user_id, expires_in });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
