import { Button, Flex } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateRoomMutation } from "./createRoom.backend.generated";

export const CreateRoomForm: React.FC<{ vulcastId: string }> = ({
  vulcastId,
}) => {
  const [createRoomMutation, { loading }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const onCreateRoomClick = useCallback(async () => {
    const result = await createRoomMutation({
      variables: {
        vulcastId,
      },
    });

    if (!result.data) {
      return;
    }

    switch (result.data.createRoom.__typename) {
      case "AuthenticationError":
        return;
      case "VulcastInRoomError":
        return;
      case "VulcastNotAssignedToRelayError":
        return;
      case "VulcastNotFoundError":
        return;
      case "Room":
        navigate(`/room/${result.data.createRoom.id}/players`);
        return;
    }
  }, [createRoomMutation, vulcastId, navigate]);

  return (
    <Flex>
      <Button isDisabled={loading} onClick={onCreateRoomClick}>
        Start a Room
      </Button>
    </Flex>
  );
};
