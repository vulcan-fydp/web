import { useSession } from "contexts/session";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouteMatch } from "react-router";
import { Redirect } from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import {
  Text,
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";

export const JoinOrHostRoom: React.FC = () => {
  const { params } = useRouteMatch<{ roomGuid?: string }>();

  const { user, room } = useSession();

  console.log(user, room);

  if (room) {
    return <Redirect to={`/room/${room.guid}/stream`} />;
  }

  if (!user || user.vulcasts.length === 0) {
    return <JoinRoom roomGuid={params.roomGuid} />;
  }

  return <JoinAndHostRoom />;
};

interface JoinRoomForm {
  roomGuid: string;
  nickname: string;
}

const JoinRoom: React.FC<{ roomGuid?: string }> = ({ roomGuid }) => {
  const [promptRoomGuid, setPromptRoomGuid] = useState(
    typeof roomGuid !== "string"
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<JoinRoomForm>({
    defaultValues: {
      roomGuid,
      nickname: "",
    },
  });

  return (
    <HeroPage>
      <Text>Hello</Text>
      <Flex
        as="form"
        flexDir="column"
        align="center"
        onSubmit={handleSubmit(() => null)}
      >
        {promptRoomGuid ? (
          <FormControl isInvalid={!!errors.roomGuid}>
            <Input
              placeholder="Room Code"
              {...register("roomGuid", {
                required: "Room code cannot be empty",
              })}
            />
            {errors.roomGuid ? (
              <FormErrorMessage>{errors.roomGuid.message}</FormErrorMessage>
            ) : null}
          </FormControl>
        ) : null}
        <FormControl isInvalid={!!errors.nickname}>
          <Input
            placeholder="Nickname"
            {...register("nickname", {
              required: "Nickname cannot be empty",
            })}
          />
          {errors.nickname ? (
            <FormErrorMessage>{errors.nickname.message}</FormErrorMessage>
          ) : null}
        </FormControl>
        <Button type="submit">Join Game</Button>
      </Flex>
    </HeroPage>
  );
};

const JoinAndHostRoom: React.FC = () => {
  return null;
};
