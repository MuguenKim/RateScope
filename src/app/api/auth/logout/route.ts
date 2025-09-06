import { NextResponse } from "next/server";
import { deleteSession } from "@/server/auth";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .map((c) => c.split("="))
    .find(([k]) => k === "auth-token")?.[1];

  if (token) {
    await deleteSession(token);
  }

  const res = NextResponse.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    `auth-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${process.env.NODE_ENV === "production" ? "Secure" : ""}`.trim(),
  );
  return res;
}

