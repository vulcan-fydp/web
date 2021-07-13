import { useSession } from "contexts/session";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouteMatch } from "react-router";
import { Redirect, useHistory } from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import {
  Text,
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  HStack,
} from "@chakra-ui/react";
import { apolloClient } from "apollo";
import {
  JoinRoomDocument,
  JoinRoomMutation,
  JoinRoomMutationVariables,
} from "./joinRoom.generated";
import { useUserQuery } from "./user.generated";
import { useApolloClient } from "@apollo/client";
import {
  CreateRoomDocument,
  useCreateRoomMutation,
} from "./createRoom.generated";

export const CreateRoomForm: React.FC<{ vulcastId: string }> = ({
  vulcastId,
}) => {
  const [createRoomMutation, { loading }] = useCreateRoomMutation();
  const history = useHistory();

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
        history.push(`/room/${result.data.createRoom.id}/players`);
        return;
    }
  }, [createRoomMutation, vulcastId]);

  return (
    <Flex>
      <Button isDisabled={loading} onClick={onCreateRoomClick}>
        Start a Room
      </Button>
    </Flex>
  );
};
