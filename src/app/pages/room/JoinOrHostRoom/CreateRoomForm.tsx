import { Button, Flex, useToast } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useCreateRoomMutation } from "./createRoom.backend.generated";
import { PostCreateRoomModal } from "./PostCreateRoomModal";

export const CreateRoomForm: React.FC<{ vulcastId: string }> = ({
  vulcastId,
}) => {
  const [createRoomMutation, { loading }] = useCreateRoomMutation();
  const showToast = useToast();

  const [roomId, setRoomId] = useState<string>();

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
      case "VulcastInRoomError":
      case "VulcastNotAssignedToRelayError":
      case "VulcastNotFoundError":
        showToast({
          description: "Failed to create room",
          status: "error",
          position: "top",
        });
        break;
      case "Room":
        setRoomId(result.data.createRoom.id);
        return;
    }
  }, [createRoomMutation, vulcastId, showToast, setRoomId]);

  return (
    <Flex>
      <PostCreateRoomModal roomId={roomId} />
      <Button isLoading={loading} onClick={onCreateRoomClick}>
        Start a Room
      </Button>
    </Flex>
  );
};
