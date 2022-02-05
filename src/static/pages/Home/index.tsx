import { Box } from "@chakra-ui/react";
import { Footer } from "static/components/Footer";
import { HeroSection } from "./HeroSection";
import { SetUpSection } from "./SetUpSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SetUpSection />
      <Footer />
    </>
  );
};
