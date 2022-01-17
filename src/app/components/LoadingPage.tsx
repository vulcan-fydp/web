import { Spinner } from "@chakra-ui/spinner";
import { HeroPage } from "app/components/HeroPage";

export const LoadingPage = () => {
  return (
    <HeroPage>
      <Spinner />
    </HeroPage>
  );
};
