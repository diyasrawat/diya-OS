import MainLayout from "@/components/layout/MainLayout";
import RecruiterMode from "@/components/sections/RecruiterMode";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LivingCV from "@/components/sections/LivingCV";
import Contact from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter View — Diya Rawat",
  description:
    "A tailored view of Diya Rawat's experience, open roles, and highlights for recruiters.",
};

export default function RecruiterPage() {
  return (
    <MainLayout>
      <RecruiterMode />
      <FeaturedProjects />
      <LivingCV />
      <Contact />
    </MainLayout>
  );
}
