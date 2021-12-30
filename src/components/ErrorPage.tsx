import { Button, Flex, Text } from "@chakra-ui/react";
import { HeroPage } from "components/HeroPage";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  message?: string;
  goBackToMessage?: string;
  goBackTo?: string;
  isTransient?: boolean;
}

function reloadPage() {
  window.location.reload();
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  message = "An error occured",
  goBackToMessage = "homepage",
  goBackTo = "/",
  isTransient = false,
}) => {
  return (
    <HeroPage>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        mt="50px"
        mb="50px"
      >
        <Text fontSize="9xl">:(</Text>
        <Text mt="30px" fontSize="xl">
          {message}
        </Text>
        {isTransient ? (
          <Button onClick={reloadPage}>Reload</Button>
        ) : (
          <Text>
            Go to{" "}
            <Button as={Link} to={goBackTo} variant="link">
              {goBackToMessage}
            </Button>
          </Text>
        )}
      </Flex>
    </HeroPage>
  );
};
