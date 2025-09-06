import { NextResponse } from "next/server";
import { createSession, verifyLogin } from "@/server/auth";

export async function POST(req: Request) {
  try {
    const { email, password, remember } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await verifyLogin(String(email), String(password));
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createSession(user.id);
    const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30d vs 7d
    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
    res.headers.append(
      "Set-Cookie",
      `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; ${process.env.NODE_ENV === "production" ? "Secure" : ""}`.trim(),
    );
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 400 });
  }
}

