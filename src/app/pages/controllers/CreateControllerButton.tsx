import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  CreateControllerModalStep,
  CREATE_CONTROLLER_QUERY_PARAM,
} from "./CreateControllerModal";

export const CreateControllerButton = (props: ButtonProps) => {
  const { path } = useRouteMatch();

  return (
    <Button
      as={NavLink}
      to={`${path}?${CREATE_CONTROLLER_QUERY_PARAM}=${CreateControllerModalStep.GAME_CONSOLE}`}
      leftIcon={<AddIcon />}
      {...props}
    >
      Create controller
    </Button>
  );
};
