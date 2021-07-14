import {
  Heading,
  Box,
  Button,
  ButtonGroup,
  Image,
  VStack,
  HStack,
  Divider,
  Link,
  Text
} from "@chakra-ui/react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { HeroPage } from "components/HeroPage";
import vulcast from "resources/vulcast.png";
import copy from "resources/copy.png";
import ReactTooltip from "react-tooltip";

const roomCode = "pink-bear-porcupine";
const roomUrl = "vulcan.play/room/" + roomCode;

export const Dashboard: React.FC = ({children}) => {
  return (
    <HeroPage isDashboard={true}>
      <VStack spacing="20px" paddingTop="64px" alignItems="left" w="1000px">
        <ShareAndCloseRoomHeader />
        <TabButtons />
        <Divider borderWidth="1px" borderColor="white" opacity={1} />
      </VStack>
      {children}
    </HeroPage>
  );
};

const ShareAndCloseRoomHeader = () => {
  return (
    <HStack direction="row" justifyContent="space-between">
      <RoomDetails />
      <EndRoom />
    </HStack>
  );
};

const RoomDetails = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [tooltipShowing, setTooltipShowing] = useState(false);
  useEffect(() => {
    if (tooltipShowing) {
      const timerID = setTimeout(() => {
        setTooltipShowing(false);
        if (buttonRef.current !== null) {
          ReactTooltip.hide(buttonRef.current);
        }
      }, 1000);
      return () => {
        clearTimeout(timerID);
      };
    }
  }, [tooltipShowing, buttonRef]);

  return (
    <HStack>
      <Image src={vulcast} />
      <VStack justifyContent="space-between" h="100px">
        <Heading as="h3" size="sm" w="320px">
          Send this link to people who you want to play with.
        </Heading>
        <Button
          variant="solid"
          rightIcon={<Image src={copy}></Image>}
          justifyContent="space-between"
          ref={buttonRef}
          data-tip="Copied!"
          data-event="click" // data-event overrides the default onClick handler
        >
          {roomUrl}
        </Button>
        <ReactTooltip
          // TODO: style this tooltip with styled components
          place="right"
          type="light"
          effect="solid"
          globalEventOff="click"
          afterShow={() => {
            navigator.clipboard.writeText(roomUrl);
            setTooltipShowing(true);
          }}
        />
      </VStack>
    </HStack>
  );
};

const EndRoom = () => {
  // TODO: Hoist this session status upwards or into a redux store
  const [isHost, setIsHost] = useState(true);
  return <Button variant="solid">{isHost ? "End Room" : "Leave Room"}</Button>;
};

const TabButtons = () => {
  return (
    <HStack w="400px" justifyContent="space-between">
      <Link as={RouterLink} to={`/room/${roomCode}/players`}>
        <Text
        color="normPurple"
        fontWeight="semibold"
        textDecoration="none"
        _onHover= {{
          color: "normPurple"
        }}
        >
          Players
        </Text>
      </Link>
      <Link as={RouterLink} to={`/room/${roomCode}/controller`}>
        <Text
        color="normPurple"
        fontWeight="semibold"
        textDecoration="none"
        _onHover= {{
          color: "normPurple"
        }}
        >
          Controller Settings
        </Text>
      </Link>
      <Link as={RouterLink} to={`/room/${roomCode}/stream`}>
        <Text
        color="normPurple"
        fontWeight="semibold"
        textDecoration="none"
        _onHover= {{
          color: "normPurple"
        }}
        >
          Game Stream
        </Text>
      </Link>
      </HStack>
  );
};
