import { Footer } from "static/components/Footer";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { FeaturesSection } from "./FeaturesSection";
import { PlayAnywhereSection } from "./PlayAnywhereSection";
import { SetUpSection } from "./SetUpSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PlayAnywhereSection />
      <SetUpSection />
      <Footer />
    </>
  );
};
