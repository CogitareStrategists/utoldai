import type { Metadata } from "next";
import DoctorsLandingPage from "./DoctorsLandingPage";

export const metadata: Metadata = {
  title: "AI Solutions for Doctors | UToldAI",
  description:
    "Professional clinic websites, AI receptionist and patient CRM solutions for doctors and clinics.",
};

export default function DoctorsPage() {
  return <DoctorsLandingPage />;
}
