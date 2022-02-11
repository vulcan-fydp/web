import { Footer } from "static/components/Footer";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { SetUpSection } from "./SetUpSection";
import { AboutSection } from "./AboutSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <SetUpSection />
      <Footer />
    </>
  );
};
