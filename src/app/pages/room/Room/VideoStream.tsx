import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { ControllerInput } from "controller-input";
import {
  ControllersDocument,
  ControllersQuery,
  ControllersQueryVariables,
} from "./controllers.backend.generated";
import {
  ApolloQueryResult,
  useApolloClient,
  useReactiveVar,
} from "@apollo/client";
import { controllerIdVar } from ".";
import { useAnimationFrame } from "lib/useAnimationFrame";
import { controllerStateToArrayBuffer } from "lib/controller";
import { motion } from "framer-motion";

import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import { useFullscreen } from "lib/useFullscreen";
import { configureController } from "./utils/configureController";

const Canvas = chakra("canvas");

const MotionBox = motion(Box);

const focusSelf = (e) => (e.target as any).focus();

interface VideoStreamProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  emitData: (data: ArrayBuffer) => void;
  controllerNumber: number | null;
}

export const VideoStream: React.FC<VideoStreamProps> = ({
  videoRef,
  emitData,
  controllerNumber,
}) => {
  const controllerInputRef = useRef<ControllerInput>();
  const client = useApolloClient();
  const controllerPromiseRef =
    useRef<Promise<ApolloQueryResult<ControllersQuery>>>();
  const controllerId = useReactiveVar(controllerIdVar);
  const controllerInputIdRef = useRef<number>();
  const sequenceNumberRef = useRef<number>(0);

  useEffect(() => {
    controllerPromiseRef.current = client.query<
      ControllersQuery,
      ControllersQueryVariables
    >({
      query: ControllersDocument,
      context: {
        target: "backend",
      },
    });
  }, [controllerPromiseRef, client]);

  const setController = useCallback(async () => {
    if (!controllerPromiseRef.current) {
      return;
    }

    const {
      data: { defaultControllers, user },
    } = await controllerPromiseRef.current;

    if (!controllerInputRef.current) {
      return;
    }

    const controllers = [...(user?.controllers ?? []), ...defaultControllers];

    const controller = controllers.find((c) => c.id === controllerId);

    if (controllerInputIdRef.current !== undefined) {
      controllerInputRef.current.removeController(controllerInputIdRef.current);
    }

    if (controller) {
      controllerInputIdRef.current = controllerInputRef.current.addController(
        configureController(controller)
      );
    } else {
      controllerIdVar(controllers[0].id);
    }
  }, [controllerId, controllerPromiseRef]);

  const onCanvasRefSet = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        if (controllerInputIdRef.current !== undefined) {
          controllerInputRef.current?.removeController(
            controllerInputIdRef.current
          );
        }
        return;
      }

      const controllerInput = new ControllerInput(canvas);

      controllerInputRef.current = controllerInput;

      setController();
    },
    [setController, controllerInputRef]
  );

  useEffect(() => {
    setController();
  }, [controllerId, controllerPromiseRef, setController]);

  const update = useCallback(() => {
    if (
      !controllerInputRef.current ||
      typeof controllerInputIdRef.current !== "number" ||
      controllerNumber === null
    ) {
      return;
    }

    const state =
      controllerInputRef.current.getState()[controllerInputIdRef.current];

    emitData(
      controllerStateToArrayBuffer(
        controllerNumber,
        sequenceNumberRef.current,
        state
      )
    );

    sequenceNumberRef.current = (sequenceNumberRef.current + 1) % 255;
  }, [
    controllerInputRef,
    controllerInputIdRef,
    controllerNumber,
    sequenceNumberRef,
    emitData,
  ]);

  useAnimationFrame(update);

  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  /* Controls */
  const [controlsOpacity, setControlsOpacity] = useState(1);
  const showControls = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
    setControlsOpacity(1);
  }, [setControlsOpacity]);
  const hideControls = useCallback<MouseEventHandler<HTMLDivElement>>(() => {
    setControlsOpacity(0);
  }, [setControlsOpacity]);

  /* Handle Fullscreen */
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  /* Handle Volume */
  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);

  const toggleVolumeMute = useCallback(() => {
    if (videoRef.current) {
      if (volume !== 0) {
        setPreviousVolume(volume);
        setVolume(0);
      } else {
        setVolume(previousVolume);
      }
    }
  }, [videoRef, volume, previousVolume]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [videoRef, volume]);

  return (
    <Box
      ref={containerRef}
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderWidth={isFullscreen ? "0px" : "2px"}
      borderColor="purple.400"
      position="relative"
    >
      <video ref={videoRef} width="100%" autoPlay />
      <Canvas
        tabIndex={0}
        ref={onCanvasRefSet}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100%"
        height="100%"
        onClick={focusSelf}
      />
      <MotionBox
        ref={controlsRef}
        position="absolute"
        bottom={isFullscreen ? "0" : "-50px"}
        width="100%"
        animate={{
          opacity: isFullscreen ? controlsOpacity : 1,
          transition: { ease: "easeIn" },
        }}
        outline={isFullscreen ? "" : "2px solid"}
        outlineColor="purple.400"
      >
        <HStack
          display="flex"
          justifyContent="flex-end"
          spacing="16px"
          paddingRight="16px"
          height="48px"
          bg="#131313"
          onMouseEnter={showControls}
          onMouseLeave={hideControls}
        >
          <Slider
            aria-label="Volume Slider"
            min={0}
            max={1}
            step={0.01}
            maxW="120px"
            value={volume}
            onChange={setVolume}
          >
            <SliderTrack bg="white">
              <SliderFilledTrack bg="#9F7AEA" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <IconButton
            aria-label="Toggle Volume"
            variant="transparent"
            icon={
              volume === 0 ? (
                <BiVolumeMute color="white" size="28px" />
              ) : (
                <BiVolumeFull color="white" size="28px" />
              )
            }
            onClick={toggleVolumeMute}
          />
          <IconButton
            aria-label="Toggle Fullscreen"
            variant="transparent"
            icon={
              isFullscreen ? (
                <AiOutlineFullscreenExit color="white" size="28px" />
              ) : (
                <AiOutlineFullscreen color="white" size="28px" />
              )
            }
            onClick={toggleFullscreen}
          />
        </HStack>
      </MotionBox>
    </Box>
  );
};
