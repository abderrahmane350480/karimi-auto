import { NextRequest, NextResponse } from "next/server";

export function backendApiUrl(path: string): string {
  const base =
    process.env.BACKEND_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  return base ? `${base.replace(/\/$/, "")}${path}` : "";
}

export async function proxyJson(
  req: NextRequest,
  path: string,
  init?: { method?: string; body?: unknown }
) {
  const url = backendApiUrl(path);
  if (!url) {
    return NextResponse.json(
      { detail: "Backend API URL is not configured" },
      { status: 503 }
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const auth = req.headers.get("authorization");
  const forwardedFor = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");
  const userAgent = req.headers.get("user-agent");
  if (auth) headers.Authorization = auth;
  if (forwardedFor) headers["X-Forwarded-For"] = forwardedFor;
  if (userAgent) headers["User-Agent"] = userAgent;

  const res = await fetch(url, {
    method: init?.method ?? req.method,
    headers,
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({ detail: "Backend API error" }));
  return NextResponse.json(data, { status: res.status });
}
