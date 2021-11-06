import { Box } from "@chakra-ui/react";
import { ControllerAxis, ControllerButton } from "backend-types";
import { useCallback, useRef } from "react";
import { NintendoSwitch } from "./assets/nintendo-switch";
import { getAxisText } from "./utils/getAxisText";
import { getButtonText } from "./utils/getButtonText";

interface ControllerVisualizerProps {
  buttons: (ControllerButton | null)[];
  axes: (ControllerAxis | null)[];
  isReadOnly: boolean;
}

export const ControllerVisualizer: React.FC<ControllerVisualizerProps> = ({
  buttons,
  axes,
  isReadOnly,
}) => {
  const rootRef = useRef<HTMLDivElement>();

  const onRootMounted = useCallback(
    (ref: HTMLDivElement) => {
      rootRef.current = ref;
    },
    [rootRef]
  );

  const layout = NintendoSwitch;

  return (
    <Box
      width="100%"
      minHeight="1px"
      ref={onRootMounted}
      position="relative"
      marginTop={layout.constraints.marginTop + "px"}
      marginBottom="100px"
    >
      <layout.Base />
      <Box
        position="absolute"
        top="50%"
        right="50%"
        bottom="50%"
        left="50%"
        overflow="visible"
      >
        {layout.inputs.map((LayoutInput, i) => (
          <LayoutInput
            key={i}
            buttons={buttons.map(getButtonText)}
            axes={axes.map(getAxisText)}
            onButtonClick={() => {}}
            onAxisClick={() => {}}
            isReadOnly={isReadOnly}
          />
        ))}
      </Box>
    </Box>
  );
};
