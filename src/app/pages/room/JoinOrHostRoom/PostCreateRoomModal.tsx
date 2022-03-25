import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ShareRoomLink } from "app/components/ShareRoomLink";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useJoinRoomMutation } from "./JoinRoomForm/joinRoom.backend.generated";

interface JoinRoomForm {
  nickname: string;
}

interface PostCreateRoomModalProps {
  roomId: string | undefined;
}

// @todo: Currently the ux is broken if you have a room running but aren't in it
export const PostCreateRoomModal: React.FC<PostCreateRoomModalProps> = ({
  roomId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [joinRoom] = useJoinRoomMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<JoinRoomForm>({
    defaultValues: {
      nickname: "",
    },
  });

  useEffect(() => {
    if (roomId !== undefined) {
      onOpen();
    }
  }, [roomId, onOpen]);

  const onJoinRoom = useCallback<SubmitHandler<JoinRoomForm>>(
    async (formData) => {
      const { data } = await joinRoom({
        variables: {
          roomId: roomId ?? "",
          nickname: formData.nickname,
        },
      });

      if (!data) {
        return;
      }

      switch (data.joinRoom.__typename) {
        case "RoomConnection":
          navigate(`/room/${data.joinRoom.room.id}/stream`);
          break;
        default:
          break;
      }
    },
    [navigate, joinRoom, roomId]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Room Created!</ModalHeader>
        <ModalBody>
          <Text mb="10px">
            Your room has been created, share this link with your friends so
            that they can play too!
          </Text>
          <ShareRoomLink roomId={roomId ?? ""} />
        </ModalBody>
        <ModalHeader>Join Room?</ModalHeader>
        <Box as="form" onSubmit={handleSubmit(onJoinRoom)}>
          <ModalBody>
            <Text mb="10px">
              Joining the room will allow you to play with your switch remotely,
              manage people in the room and more!
            </Text>
            <FormControl isInvalid={!!errors.nickname}>
              <Text>Nickname</Text>
              <Input
                placeholder="__vulcangaming__"
                {...register("nickname", {
                  required: "Please provide a nickname",
                })}
              />
              {errors.nickname ? (
                <FormErrorMessage>{errors.nickname.message}</FormErrorMessage>
              ) : null}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr="10px" onClick={onClose} type="button">
              Maybe Later
            </Button>
            <Button type="submit">Join Now</Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};
