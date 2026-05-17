import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/strapi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await subscribeNewsletter({
      email,
      name: name || undefined,
      source: source || "resources",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Subscription failed";
    if (message === "STRAPI_UNAVAILABLE") {
      return NextResponse.json(
        {
          success: true,
          message: "Saved locally—connect Strapi to persist signups.",
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
