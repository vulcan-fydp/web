import {
  MouseEventHandler,
  Ref,
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
import { Controller, ControllerInput } from "controller-input";
import {
  ControllersDocument,
  ControllersQuery,
  ControllersQueryResult,
  ControllersQueryVariables,
  useControllersQuery,
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
import screenfull from "screenfull";

const Canvas = chakra("canvas");

interface VideoStreamProps {
  videoRef: Ref<HTMLVideoElement>;
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
        controller as unknown as Controller
      );
      console.log(controllerInputIdRef.current);
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

  const MotionBox = motion(Box);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClickFullscreen = useCallback<MouseEventHandler>(async () => {
    if (containerRef.current) {
      await screenfull.toggle(containerRef.current!);
      setIsFullscreen(screenfull.isFullscreen);
    }
  }, [containerRef]);

  const toggleVolume = useCallback(() => {
    if (videoPlayerRef.current) {
      if (volume === 0) {
        setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        setVolume(0);
      }
    }
  }, [volume, previousVolume]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.volume = volume;
    }
  }, [videoPlayerRef, volume]);

  const [controlsOpacity, setControlsOpacity] = useState(1);

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
      <video
        ref={videoPlayerRef}
        width="100%"
        autoPlay
        loop
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
      <Canvas
        ref={onCanvasRefSet}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100%"
        height="100%"
      />
      <MotionBox
        ref={controlsRef}
        position="absolute"
        bottom="0"
        width="100%"
        animate={{ opacity: controlsOpacity, transition: { ease: "easeIn" } }}
      >
        <HStack
          display="flex"
          justifyContent="flex-end"
          spacing="16px"
          paddingRight="16px"
          height="48px"
          bg="#131313"
          onMouseEnter={() => {
            setControlsOpacity(1);
          }}
          onMouseLeave={() => {
            setControlsOpacity(0);
          }}
        >
          <Slider
            aria-label="Volume Slider"
            min={0}
            max={1}
            step={0.05}
            maxW="120px"
            value={volume}
            onChange={(v) => setVolume(v)}
            marginRight="8px"
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
            onClick={() => {
              toggleVolume();
            }}
          />
          <IconButton
            aria-label="Toggle Fullscreen"
            variant="transparent"
            icon={
              isFullscreen ? (
                <AiOutlineFullscreenExit color="white" size="24px" />
              ) : (
                <AiOutlineFullscreen color="white" size="24px" />
              )
            }
            onClick={handleClickFullscreen}
          />
        </HStack>
      </MotionBox>
    </Box>
  );
};
