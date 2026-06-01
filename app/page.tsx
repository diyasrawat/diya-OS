import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import CurrentFocus from "@/components/sections/CurrentFocus";
import GithubIntelligence from "@/components/sections/GithubIntelligence";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LivingCV from "@/components/sections/LivingCV";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <CurrentFocus />
      <GithubIntelligence />
      <FeaturedProjects />
      <LivingCV />
      <Contact />
    </MainLayout>
  );
}
