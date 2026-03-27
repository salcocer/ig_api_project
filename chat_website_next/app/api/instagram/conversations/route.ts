import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchInstagramConversations } from "@/lib/api";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    let access_token = (await cookieStore)?.get("access_token")?.value || "";

    if (process.env.NODE_ENV === "production" && !access_token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (process.env.NODE_ENV === "development") {
      access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    }

    const data = await fetchInstagramConversations(
      {
        platform: "instagram",
        fields: "updated_time,participants{username,id}",
      },
      access_token,
    ).catch((error: { message: string | undefined }) => {
      throw new Error(error?.message);
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Fetch failed" },
      { status: 500 },
    );
  }
}
