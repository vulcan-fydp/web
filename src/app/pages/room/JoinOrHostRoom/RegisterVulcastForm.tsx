import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const RegisterVulcastForm = () => {
  return (
    <Flex>
      <Button as={Link} to="/account/vulcasts">
        Link your Vulcast
      </Button>
    </Flex>
  );
};
