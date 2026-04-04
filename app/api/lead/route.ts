import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadRequestBody = {
  page?: string;
  answers?: {
    ageGroup?: string;
    insuranceGoal?: string;
    state?: string;
    firstName?: string;
    lastName?: string;
    phoneCountry?: string;
    phoneNumber?: string;
    email?: string;
    locationText?: string;
    zipCode?: string;
  };
  meta?: {
    deviceId?: string;
    pageUrl?: string;
    referrer?: string;
    queryParams?: Record<string, string | string[]>;
  };
};

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim() || "";
}

function countryCodeToFlag(countryCode: string) {
  if (!/^[A-Z]{2}$/.test(countryCode)) return "";

  return Array.from(countryCode)
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function vercelRegionFromHeaders(request: NextRequest) {
  const explicitRegion =
    request.headers.get("x-vercel-region") ||
    request.headers.get("x-region");

  if (explicitRegion) {
    return explicitRegion;
  }

  const vercelId = request.headers.get("x-vercel-id") || "";
  return vercelId.split("::")[0]?.trim() || "";
}

function ipAddressFromHeaders(request: NextRequest) {
  return (
    firstHeaderValue(request.headers.get("cf-connecting-ip")) ||
    firstHeaderValue(request.headers.get("x-forwarded-for")) ||
    firstHeaderValue(request.headers.get("x-real-ip")) ||
    ""
  );
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanObjectRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, string | string[]>;
  }

  const entries = Object.entries(value).flatMap<[string, string | string[]]>(
    ([key, item]) => {
      if (typeof item === "string") {
        const cleaned = item.trim();
        return cleaned ? [[key, cleaned]] : [];
      }

      if (Array.isArray(item)) {
        const cleaned = item
          .filter((entry): entry is string => typeof entry === "string")
          .map((entry) => entry.trim())
          .filter(Boolean);

        return cleaned.length ? [[key, cleaned]] : [];
      }

      return [];
    }
  );

  return Object.fromEntries(entries) as Record<string, string | string[]>;
}

export async function POST(request: NextRequest) {
  const primaryWebhookUrl = process.env.WEBHOOK_1;
  const secondaryWebhookUrl = process.env.WEBHOOK_2;

  if (!primaryWebhookUrl) {
    return Response.json(
      { error: "Missing lead webhook configuration" },
      { status: 500 }
    );
  }

  let body: LeadRequestBody;

  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const answers = body.answers ?? {};
  const country = (request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "").toUpperCase();
  const urlParams = cleanObjectRecord(body.meta?.queryParams);
  const fbclid =
    typeof urlParams.fbclid === "string"
      ? urlParams.fbclid
      : Array.isArray(urlParams.fbclid)
        ? urlParams.fbclid[0] || ""
        : "";
  const metaCookies = {
    _fbp: request.cookies.get("_fbp")?.value || "",
    _fbc: request.cookies.get("_fbc")?.value || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : ""),
  };
  const payload = {
    submittedAt: new Date().toISOString(),
    source: "best-money-next",
    pagina: cleanString(body.page) || "/survey",
    ipAddress: ipAddressFromHeaders(request),
    geolocation: {
      country,
      flag: countryCodeToFlag(country),
      countryRegion: request.headers.get("x-vercel-ip-country-region") || "",
      region: vercelRegionFromHeaders(request),
      latitude: request.headers.get("x-vercel-ip-latitude") || "",
      longitude: request.headers.get("x-vercel-ip-longitude") || "",
    },
    ageGroup: cleanString(answers.ageGroup),
    insuranceGoal: cleanString(answers.insuranceGoal),
    state: cleanString(answers.state),
    firstName: cleanString(answers.firstName),
    lastName: cleanString(answers.lastName),
    email: cleanString(answers.email),
    locationText: cleanString(answers.locationText),
    phoneNumber: cleanString(answers.phoneNumber),
    validation: {
      phoneCountry: cleanString(answers.phoneCountry) || "US",
      duplicatePhoneCount: 1,
      ipVelocityCount: 1,
      deviceVelocityCount: 1,
      flags: [] as string[],
    },
    urlParams,
    pageUrl: cleanString(body.meta?.pageUrl),
    referrer: cleanString(body.meta?.referrer),
    metaCookies,
  };

  const [primaryResult, secondaryResult] = await Promise.allSettled(
    [
      fetch(primaryWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }),
      secondaryWebhookUrl
        ? fetch(secondaryWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            cache: "no-store",
          })
        : Promise.resolve(null),
    ]
  );

  const primaryOk =
    primaryResult.status === "fulfilled" &&
    primaryResult.value !== null &&
    primaryResult.value.ok;
  const secondaryOk =
    secondaryResult.status === "fulfilled" &&
    (secondaryResult.value === null || secondaryResult.value.ok);

  if (!primaryOk) {
    return Response.json(
      {
        error: "Primary lead webhook delivery failed",
        primaryOk: false,
        secondaryOk,
      },
      { status: 502 }
    );
  }

  return Response.json({
    ok: true,
    primaryOk: true,
    secondaryOk,
    deliveredTo: secondaryWebhookUrl ? (secondaryOk ? 2 : 1) : 1,
  });
}
