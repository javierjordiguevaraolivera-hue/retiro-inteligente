import type { NextRequest } from "next/server";
import { inferGeoFromHeaders } from "@/lib/geo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  return Response.json(await inferGeoFromHeaders(request.headers));
}
