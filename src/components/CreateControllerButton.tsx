import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const CreateControllerButton = (props: ButtonProps) => {
  return (
    <Button
      as={NavLink}
      to="/controllers/create"
      leftIcon={<AddIcon />}
      {...props}
    >
      Create controller
    </Button>
  );
};
