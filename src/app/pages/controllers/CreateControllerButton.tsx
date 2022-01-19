import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useTriggerSiteModal } from "lib/site-modal";

export const CreateControllerButton = (props: ButtonProps) => {
  const triggerModal = useTriggerSiteModal("CreateController");

  return (
    <Button onClick={triggerModal} leftIcon={<AddIcon />} {...props}>
      Create controller
    </Button>
  );
};
