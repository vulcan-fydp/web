import { Box } from "@chakra-ui/react";
import { HeroSection } from "./HeroSection";
import { SetUpSection } from "./SetUpSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SetUpSection />
      <Box height="500px" />
    </>
  );
};
