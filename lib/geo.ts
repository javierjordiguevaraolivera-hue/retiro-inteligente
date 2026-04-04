type GeoLookupResponse = {
  location?: string | null;
  state?: string | null;
  zipCode?: string | null;
  source?: "zippopotam" | "vercel-ip" | "fallback";
  fallback?: boolean;
};

type HeaderReader = {
  get(name: string): string | null;
};

const STATE_BY_CODE: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia",
};

function normalizeZip(value: string | null) {
  return (value ?? "").replace(/\D/g, "").slice(0, 5);
}

function buildLocation(city: string, region: string) {
  if (city && region) return `${city}, ${region}`;
  return city || region || "Rates available for your area";
}

async function resolveUsZip(zipCode: string): Promise<GeoLookupResponse | null> {
  if (!/^\d{5}$/.test(zipCode)) return null;

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      places?: Array<{
        "place name"?: string;
        state?: string;
        "state abbreviation"?: string;
      }>;
    };

    const place = data.places?.[0];
    if (!place?.state) return null;

    const city = place["place name"]?.trim() || "";
    const state = place.state.trim();
    const stateCode = place["state abbreviation"]?.trim() || "";

    return {
      location: buildLocation(city, stateCode || state),
      state,
      zipCode,
      source: "zippopotam",
      fallback: false,
    };
  } catch {
    return null;
  }
}

export async function inferGeoFromHeaders(
  headers: HeaderReader
): Promise<GeoLookupResponse> {
  const country = headers.get("x-vercel-ip-country")?.toUpperCase() || "";
  const city = headers.get("x-vercel-ip-city")?.trim() || "";
  const regionHeader = headers.get("x-vercel-ip-country-region")?.trim() || "";
  const zipCode = normalizeZip(headers.get("x-vercel-ip-postal-code"));
  const stateFromHeader = STATE_BY_CODE[regionHeader.toUpperCase()] || "";

  if (country !== "US") {
    return {
      location: buildLocation(city, country),
      zipCode: null,
      state: null,
      source: "fallback",
      fallback: true,
    };
  }

  if (zipCode) {
    const resolvedZip = await resolveUsZip(zipCode);
    if (resolvedZip) {
      return resolvedZip;
    }
  }

  return {
    location: buildLocation(city, regionHeader || "US"),
    zipCode: zipCode || null,
    state: stateFromHeader || null,
    source: "vercel-ip",
    fallback: !zipCode || !stateFromHeader,
  };
}

export type { GeoLookupResponse };
