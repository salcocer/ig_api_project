import { NextResponse } from "next/server";
import type { SessionUser } from "@/store/constants";
import { fetchShortLivedToken, fetchLongLivedToken } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body?.code;
    const client_id = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || "";
    const client_secret = process.env.NEXT_PUBLIC_INSTAGRAM_APP_SECRET || "";
    const redirect_uri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || "";

    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    if (!client_id || !client_secret || !redirect_uri) {
      return NextResponse.json(
        { error: "Missing Instagram env vars on server" },
        { status: 400 },
      );
    }

    // Exchange code for short-lived token
    const shortData = await fetchShortLivedToken(
      client_id,
      client_secret,
      redirect_uri,
      code,
    );
    if (!shortData || !shortData.access_token) {
      return NextResponse.json(
        { error: "Failed to get short-lived access token" },
        { status: 500 },
      );
    }

    // Exchange short-lived token for a long-lived token (server-side)
    const longData = await fetchLongLivedToken(
      client_secret,
      shortData.access_token,
    );
    if (!longData || !longData.access_token) {
      return NextResponse.json(
        { error: "Failed to get long-lived access token" },
        { status: 500 },
      );
    }

    // Set HTTP-only cookie with long-lived token (do not expose token in response)
    const maxAge =
      typeof longData.expires_in === "number"
        ? Math.floor(longData.expires_in / 3600 / 24) // convert seconds to days
        : 60 * 60 * 24 * 60; // fallback 60 days

    const expires_at = new Date(
      new Date().getTime() + maxAge * 24 * 60 * 60 * 1000,
    );

    const sessionData: SessionUser = {
      user_id: shortData.user_id,
      access_token: longData.access_token, // quitar del session
      permissions: shortData.permissions || [],
      created_at: new Date().toISOString(),
      expires_at: expires_at.toISOString(),
    };

    const res = NextResponse.json({ success: true, data: sessionData });

    res.cookies.set("access_token", longData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    res.cookies.set("expires_at", expires_at.toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Exchange failed" },
      { status: 500 },
    );
  }
}
