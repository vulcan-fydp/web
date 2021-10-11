import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Controller } from "backend-types";
import { ControllerTags } from "components/ControllerTags";
import { CreateControllerButton } from "pages/controllers/CreateControllerButton";
import { NavLink } from "react-router-dom";
import { useUserControllersQuery } from "./userControllers.backend.generated";

export const UserControllers = () => {
  const { data, loading, error } = useUserControllersQuery();

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="400px"
      >
        <Spinner />
      </Box>
    );
  }

  if (error || !data || !data.user) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="400px"
      >
        Unable to load controllers
      </Box>
    );
  }

  if (data.user.controllers.length === 0) {
    return <NoUserControllers />;
  }

  return (
    <VStack alignItems="left" spacing="20px">
      {data.user.controllers.map((controller) => (
        <UserControllerRow controller={controller} key={controller.id} />
      ))}

      <CreateControllerButton />
    </VStack>
  );
};

const NoUserControllers = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      height="400px"
    >
      You don't have any controllers yet
      <CreateControllerButton mt="10px" />
    </Box>
  );
};

interface UserControllerRowProps {
  controller: Controller;
}

export const UserControllerRow: React.FC<UserControllerRowProps> = ({
  controller,
}) => {
  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor="whiteAlpha.50"
      borderRadius="5px"
    >
      <Text fontSize="lg" marginRight="20px">
        {controller.name}
      </Text>
      <ControllerTags controller={controller} />
      <Box flex="1 1 auto" />
      <HStack spacing="5px">
        <Button
          as={NavLink}
          to={`/controllers/${controller.id}`}
          variant="solid"
          size="sm"
          leftIcon={<EditIcon />}
          colorScheme="yellow"
        >
          Edit
        </Button>
        <Button
          variant="solid"
          size="sm"
          leftIcon={<CopyIcon />}
          colorScheme="blue"
        >
          Share
        </Button>
        <Button
          variant="solid"
          size="sm"
          leftIcon={<DeleteIcon />}
          colorScheme="red"
        >
          Delete
        </Button>
      </HStack>
    </Flex>
  );
};
