import type { Metadata } from "next";
import { headers } from "next/headers";
import { MetaPixelViewContent } from "@/app/components/meta-pixel-view-content";
import { inferGeoFromHeaders } from "@/lib/geo";
import IulV2ExportPage from "../../exports/iul-v2-page";

export const metadata: Metadata = {
  title: "Survey | Plan de Retiro Inteligente",
  description: "Survey de calificación para Plan de Retiro Inteligente.",
};

export default async function SurveyPage() {
  const initialGeo = await inferGeoFromHeaders(await headers());

  return (
    <>
      <MetaPixelViewContent />
      <IulV2ExportPage initialGeo={initialGeo} />
    </>
  );
}
