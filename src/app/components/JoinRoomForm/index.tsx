import {
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
  roomCode: string;
  nickname: string;
}

export const JoinRoomForm: React.FC<{ roomCode?: string }> = ({ roomCode }) => {
  const [promptRoomCode] = useState(typeof roomCode !== "string");

  const [submissionErrorMessage, setSubmissionErrorMessage] =
    useState<string>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setFocus,
  } = useForm<JoinRoomFormData>({
    defaultValues: {
      roomCode: roomCode ?? "",
      nickname: "",
    },
  });

  useEffect(() => {
    setFocus("nickname");
  }, [setFocus]);

  const navigate = useNavigate();

  const onFormSubmit = useCallback<SubmitHandler<JoinRoomFormData>>(
    async ({ roomCode, nickname }) => {
      let result;
      try {
        result = await apolloClient.mutate<
          JoinRoomMutation,
          JoinRoomMutationVariables
        >({
          mutation: JoinRoomDocument,
          variables: {
            roomCode,
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
      align="center"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormControl isInvalid={!!errors.nickname} align="center">
        <Input
          placeholder="Nickname"
          {...register("nickname", {
            required: "Nickname cannot be empty",
          })}
          width="266px"
        />
        {errors.nickname ? (
          <FormErrorMessage>{errors.nickname.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      {promptRoomCode ? (
        <FormControl isInvalid={!!errors.roomCode} mt="10px" align="center">
          <Input
            placeholder="Room Code"
            {...register("roomCode", {
              required: "Room code cannot be empty",
            })}
            width="266px"
          />
          {errors.roomCode ? (
            <FormErrorMessage>{errors.roomCode.message}</FormErrorMessage>
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
