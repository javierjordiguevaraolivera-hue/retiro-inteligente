import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ZippopotamPlace = {
  "place name"?: string;
  state?: string;
  "state abbreviation"?: string;
};

type ZippopotamResponse = {
  "post code"?: string;
  country?: string;
  "country abbreviation"?: string;
  places?: ZippopotamPlace[];
};

type ZipLookupResponse = {
  location?: string | null;
  state?: string | null;
  zipCode?: string | null;
  source?: "zippopotam" | "vercel-ip" | "fallback";
  fallback?: boolean;
};

function json(data: ZipLookupResponse, init?: ResponseInit) {
  return Response.json(data, init);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ zip: string }> }
) {
  const { zip } = await params;
  const normalizedZip = zip.replace(/\D/g, "").slice(0, 5);

  if (normalizedZip.length !== 5) {
    return json(
      {
        zipCode: normalizedZip,
        source: "fallback",
        fallback: true,
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${normalizedZip}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return json(
        {
          zipCode: normalizedZip,
          source: "fallback",
          fallback: true,
        },
        { status: response.status === 404 ? 404 : 502 }
      );
    }

    const data = (await response.json()) as ZippopotamResponse;
    const place = data.places?.[0];

    if (!place?.state) {
      return json(
        {
          zipCode: normalizedZip,
          source: "fallback",
          fallback: true,
        },
        { status: 502 }
      );
    }

    const city = place["place name"]?.trim() || "";
    const state = place.state.trim();
    const stateAbbreviation = place["state abbreviation"]?.trim() || "";
    const location = city
      ? `${city}, ${stateAbbreviation || state}`
      : state;

    return json({
      location,
      state,
      zipCode: normalizedZip,
      source: "zippopotam",
      fallback: false,
    });
  } catch {
    return json(
      {
        zipCode: normalizedZip,
        source: "fallback",
        fallback: true,
      },
      { status: 502 }
    );
  }
}
