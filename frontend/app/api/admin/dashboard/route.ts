import { NextRequest } from "next/server";
import { proxyJson } from "../../_lib/backend-proxy";

export async function GET(req: NextRequest) {
  return proxyJson(req, `/api/admin/dashboard${req.nextUrl.search}`);
}
