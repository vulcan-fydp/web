import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { apolloClient } from "apollo";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  JoinRoomDocument,
  JoinRoomMutation,
  JoinRoomMutationVariables,
} from "./joinRoom.backend.generated";

interface JoinRoomFormData {
  roomId: string;
  nickname: string;
}

export const JoinRoomForm: React.FC<{ roomId?: string }> = ({ roomId }) => {
  const [promptRoomId, setPromptRoomId] = useState(typeof roomId !== "string");

  const [
    submissionErrorMessage,
    setSubmissionErrorMessage,
  ] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<JoinRoomFormData>({
    defaultValues: {
      roomId: roomId ?? "",
      nickname: "",
    },
  });

  const history = useHistory();

  const onFormSubmit = useCallback<SubmitHandler<JoinRoomFormData>>(
    async ({ roomId, nickname }) => {
      let result;
      try {
        result = await apolloClient.mutate<
          JoinRoomMutation,
          JoinRoomMutationVariables
        >({
          mutation: JoinRoomDocument,
          variables: {
            roomId,
            nickname,
          },
        });
      } catch {}

      if (!result || !result.data) {
        setSubmissionErrorMessage(
          "An unknown error has occured. Please check your room code and nickname and try again"
        );
        return;
      }

      if (result.data.joinRoom.__typename === "AuthenticationError") {
        throw new Error("Not implemented");
      }

      if (result.data.joinRoom.__typename === "ClientInRoomError") {
        setSubmissionErrorMessage("You cannot join multiple rooms at once.");
        return;
      }

      history.push(`/room/${result.data.joinRoom.room.id}/stream`);
    },
    [history]
  );

  return (
    <Flex
      as="form"
      flexDir="column"
      align="center"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {promptRoomId ? (
        <FormControl isInvalid={!!errors.roomId}>
          <Input
            placeholder="Room Code"
            {...register("roomId", {
              required: "Room code cannot be empty",
            })}
          />
          {errors.roomId ? (
            <FormErrorMessage>{errors.roomId.message}</FormErrorMessage>
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
      <Button type="submit" isDisabled={isSubmitting}>
        Join Room
      </Button>
      {submissionErrorMessage !== undefined ? (
        <Text>{submissionErrorMessage}</Text>
      ) : null}
    </Flex>
  );
};
