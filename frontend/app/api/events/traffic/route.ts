import { NextRequest } from "next/server";
import { proxyJson } from "../../_lib/backend-proxy";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyJson(req, "/api/events/traffic", { method: "POST", body });
}
