import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { fetchInstagramConversationMessages } from "@/lib/api";

export async function GET(
  req: NextRequest,
  context: { params: { message_id: string } | Promise<{ message_id: string }> },
) {
  try {
    const cookieStore = cookies();
    let access_token = (await cookieStore)?.get("access_token")?.value || "";

    if (process.env.NODE_ENV === "production" && !access_token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (process.env.NODE_ENV === "development") {
      access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    }

    const params = await context.params;
    const message_id = params?.message_id;

    const data = await fetchInstagramConversationMessages(
      `${message_id}`,
      {
        fields:
          "participants,messages{id,created_time,from,to,message,reactions,shares,attachments}limit=15",
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
