import { NextResponse } from "next/server";
import { createSession, createUser } from "@/server/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await createUser(String(email), String(password));
    const token = await createSession(user.id);

    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } }, { status: 201 });
    res.headers.append(
      "Set-Cookie",
      `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${process.env.NODE_ENV === "production" ? "Secure" : ""}`.trim(),
    );
    return res;
  } catch (err: any) {
    const message = err?.message ?? "Registration failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

