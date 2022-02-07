import { Footer } from "static/components/Footer";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { SetUpSection } from "./SetUpSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SetUpSection />
      <Footer />
    </>
  );
};
