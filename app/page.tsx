import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding";
import GitHubIntelligence from "@/components/sections/GithubIntelligence";
import FeaturedWork from "@/components/sections/FeaturedWork";
import RecruiterModeTeaser from "@/components/sections/RecruiterModeTeaser";
import LivingCV from "@/components/sections/LivingCV";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-[1280px] mx-auto">
        <Hero />
        <CurrentlyBuilding />
        <GitHubIntelligence />
        <FeaturedWork />
        <RecruiterModeTeaser />
        <LivingCV />
        <Contact />
      </div>
    </MainLayout>
  );
}
