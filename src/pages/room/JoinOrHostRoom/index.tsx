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
import { JoinRoomForm } from "./JoinRoomForm";
import { CreateRoomForm } from "./CreateRoomForm";

export const JoinOrHostRoom: React.FC = () => {
  const { params } = useRouteMatch<{ roomId?: string }>();

  const { data, loading } = useUserQuery();

  if (loading || !data) {
    return null;
  }

  if (data.room) {
    return <Redirect to={`/room/${data.room.id}/stream`} />;
  }

  if (!data.user || data.user.vulcasts.length === 0) {
    return <JoinRoom roomId={params.roomId} />;
  }

  return <JoinAndHostRoom vulcastId={data.user.vulcasts[0].id} />;
};

const JoinRoom: React.FC<{ roomId?: string }> = ({ roomId }) => {
  return (
    <HeroPage>
      <Text>Hello</Text>
      <JoinRoomForm roomId={roomId} />
    </HeroPage>
  );
};

const JoinAndHostRoom: React.FC<{ vulcastId: string }> = ({ vulcastId }) => {
  return (
    <Flex>
      <HStack>
        <JoinRoomForm />
        <CreateRoomForm vulcastId={vulcastId} />
      </HStack>
    </Flex>
  );
};
