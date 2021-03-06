import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { apolloClient } from "app/apollo";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  const [promptRoomId] = useState(typeof roomId !== "string");

  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setFocus,
  } = useForm<JoinRoomFormData>({
    defaultValues: {
      roomId: roomId ?? "",
      nickname: "",
    },
  });

  useEffect(() => {
    setFocus("nickname");
  }, [setFocus]);

  const navigate = useNavigate();

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
          context: {
            target: "backend",
          },
        });
      } catch (error) {
        console.log(error);
      }

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

      navigate(`/room/${result.data.joinRoom.room.id}/stream`);
    },
    [navigate]
  );

  return (
    <Flex
      as="form"
      flexDir="column"
      alignItems="center"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormControl isInvalid={!!errors.nickname} align="center" width="266px">
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
      {promptRoomId ? (
        <FormControl
          isInvalid={!!errors.roomId}
          mt="10px"
          align="center"
          width="266px"
        >
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
      <Button type="submit" isDisabled={isSubmitting} mt="40px" mb="20px">
        Join Room
      </Button>
      {submissionErrorMessage !== undefined ? (
        <Text>{submissionErrorMessage}</Text>
      ) : null}
    </Flex>
  );
};
