import {
  HStack,
  VStack,
  Heading,
  Center,
  Image,
  Spinner,
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import profile from "resources/profile.png";
import { ControllerIcon } from "resources/controller";
import spectatorIcon from "resources/spectator.png";
import {
  useClientPlayersInRoomQuery,
  useSetControllerNumbersForRoomSessionsMutation,
} from "./playersInRoom.backend.generated";

const controllerColors = ["#E53E3E", "#3182CE", "#38A169", "#D69E2E"];

function getControllerNumberColor(controllerNumber: number) {
  return controllerColors[controllerNumber] ?? "white";
}

function getControllerNumberDisplayText(controllerNumber: number | null) {
  if (controllerNumber === null) {
    return "Spectator";
  }

  return `Player ${controllerNumber + 1}`;
}

const playerLoadingError =
  "There was an error loading players, please try again.";

export const PlayerTab: React.FC = () => {
  const { data, loading, error } = useClientPlayersInRoomQuery({
    pollInterval: 10000,
  });
  const [
    setControllerNumbersForRoomSessions,
  ] = useSetControllerNumbersForRoomSessionsMutation();

  if (loading) {
    <Center align="center">
      <Spinner color="purple.400" mt="120px" />
    </Center>;
  }
  if (error) {
    return <Heading> {playerLoadingError} </Heading>;
  }

  // TODO: Introduce better error messages/handling and remove the following
  if (!data) {
    return <Heading> No data found </Heading>;
  }
  if (!data.roomSession) {
    return <Heading> No room session found </Heading>;
  }
  if (data.roomSession.room.roomSessions.length === 0) {
    return <Heading> Nobody is in the room </Heading>;
  }

  const setControllerNumber = async (
    controllerNumber: number | null,
    roomSessionId: string
  ) => {
    if (controllerNumber === null) {
      const roomSession = data.roomSession!.room.roomSessions.find(
        ({ id }) => id === roomSessionId
      );
      if (!roomSession) {
        throw new Error("Got unexpected undefined roomSession");
      }
      if (roomSession.controllerNumber !== null) {
        await setControllerNumbersForRoomSessions({
          variables: {
            roomId: data.roomSession!.room.id,
            controllerNumbersForRoomSessions: [
              {
                roomSessionId,
                controllerNumber,
              },
            ],
          },
        });
      }
    } else {
      const roomSessionWithControllerNumber = data.roomSession!.room.roomSessions.find(
        (rs) => rs.controllerNumber === controllerNumber
      );
      if (roomSessionWithControllerNumber) {
        if (roomSessionWithControllerNumber.id !== roomSessionId) {
          await setControllerNumbersForRoomSessions({
            variables: {
              roomId: data.roomSession!.room.id,
              controllerNumbersForRoomSessions: [
                {
                  roomSessionId,
                  controllerNumber,
                },
                {
                  roomSessionId: roomSessionWithControllerNumber.id,
                  controllerNumber: null,
                },
              ],
            },
          });
        }
      } else {
        await setControllerNumbersForRoomSessions({
          variables: {
            roomId: data.roomSession!.room.id,
            controllerNumbersForRoomSessions: [
              {
                roomSessionId,
                controllerNumber,
              },
            ],
          },
        });
      }
    }
  };

  const currentPlayerId = data.roomSession.id;
  const roomSessions = [...data.roomSession.room.roomSessions];

  return (
    <VStack alignItems="left" spacing="20px">
      {roomSessions
        .sort((player1, _) => {
          // Keep the current player at the top
          if (player1.id === currentPlayerId) {
            return -1;
          }
          return 0;
        })
        .map(({ nickname, controllerNumber, id }) => {
          const isCurrentPlayer = id === currentPlayerId;
          return (
            <PlayerRow
              key={id}
              isHost={true} // @todo: backend isn't doesn't support this yet
              nickname={nickname}
              controllerNumber={controllerNumber ?? null}
              isCurrentPlayer={isCurrentPlayer}
              setControllerNumber={(controllerNumber) =>
                setControllerNumber(controllerNumber, id)
              }
            />
          );
        })}
    </VStack>
  );
};

interface PlayerRowProps {
  isHost: boolean;
  nickname: string;
  controllerNumber: number | null;
  isCurrentPlayer: boolean;
  setControllerNumber: (controllerNumber: number | null) => void;
}

const PlayerRow: React.FC<PlayerRowProps> = ({
  nickname,
  isHost,
  controllerNumber,
  isCurrentPlayer,
  setControllerNumber,
}) => {
  return (
    <Flex
      padding="15px 25px"
      align="center"
      backgroundColor={isCurrentPlayer ? "whiteAlpha.200" : "whiteAlpha.50"}
      borderRadius="5px"
    >
      <HStack direction="row" alignItems="center" width="300px" spacing={4}>
        <Image src={profile} width="32px" />
        <Text fontSize="lg">{nickname}</Text>
      </HStack>
      <Box flex="1 1 auto" />
      <HStack minW="154px" spacing={4}>
        {controllerNumber === null ? (
          <Image src={spectatorIcon} />
        ) : (
          <ControllerIcon color={getControllerNumberColor(controllerNumber)} />
        )}
        {/* <div style={{ width: "120px" }}> */}
        <Menu matchWidth>
          <MenuButton
            as={Button}
            variant="outline"
            size="sm"
            disabled={!isHost}
          >
            {getControllerNumberDisplayText(controllerNumber)}
          </MenuButton>
          <MenuList minWidth="150px" bgColor="black" borderColor="purple.300">
            <MenuItem onClick={() => setControllerNumber(0)}>
              {getControllerNumberDisplayText(0)}
            </MenuItem>
            <MenuItem onClick={() => setControllerNumber(1)}>
              {getControllerNumberDisplayText(1)}
            </MenuItem>
            <MenuItem onClick={() => setControllerNumber(2)}>
              {getControllerNumberDisplayText(2)}
            </MenuItem>
            <MenuItem onClick={() => setControllerNumber(3)}>
              {getControllerNumberDisplayText(3)}
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setControllerNumber(null)}>
              {getControllerNumberDisplayText(null)}
            </MenuItem>
          </MenuList>
        </Menu>
        {/* </div> */}
      </HStack>
    </Flex>
  );
};
