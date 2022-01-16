import { Ref, useCallback, useEffect, useRef } from "react";
import { Box, chakra } from "@chakra-ui/react";
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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderWidth="2px"
      borderColor="brightPurple.400"
      position="relative"
    >
      <video ref={videoRef} width="100%" autoPlay />
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
    </Box>
  );
};
