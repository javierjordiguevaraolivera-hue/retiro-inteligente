import type { Metadata } from "next";
import SurveyClient from "./SurveyClient";

export const metadata: Metadata = {
  title: "Survey | Plan de Retiro Inteligente",
  description: "Survey de calificación para Plan de Retiro Inteligente.",
};

export default function SurveyPage() {
  return <SurveyClient />;
}
