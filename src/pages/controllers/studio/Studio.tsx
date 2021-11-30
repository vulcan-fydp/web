import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ControllerAxis, ControllerButton } from "backend-types";
import { HeroPage } from "components/HeroPage";
import { getNonInteractiveButtonProps } from "lib/getNonInteractiveButtonProps";
import React, { useCallback, useState } from "react";
import { ControllerVisualizer } from "./ControllerVisualizer";
import {
  ControllerType,
  CONTROLLER_TYPE_DISPLAY_ORDER,
  getControllerTypeName,
} from "./enums/controller-type";
import { GameConsole, getGameConsoleName } from "./enums/game-console";
import { KeyboardAndMouseAxisModal } from "./modals/KeyboardAndMouseAxisModal";
import { KeyboardAndMouseButtonModal } from "./modals/KeyboardAndMouseButtonModal";
import { KeyboardButtonModal } from "./modals/KeyboardButtonModal";

interface ControllerStudioProps {
  buttons: (ControllerButton | null)[];
  axes: (ControllerAxis | null)[];
  gameConsole: GameConsole;
  controllerType: ControllerType;
  name: string;
  onButtonChange: (
    buttonNumber: number,
    button: ControllerButton | null
  ) => void;
  onAxisChange: (axisNumber: number, axis: ControllerAxis | null) => void;
  onGameConsoleChange: (gameConsole: GameConsole) => void;
  /**
   * This is guaranteed not to be a pseudo controller type
   */
  onControllerTypeChange: (controllerType: ControllerType) => void;
  onNameChange: (name: string) => void;
  isReadOnly?: boolean;
}

export const ControllerStudio: React.FC<ControllerStudioProps> = ({
  isReadOnly,
  buttons,
  axes,
  gameConsole,
  controllerType,
  name,
  onNameChange,
  onButtonChange,
  onAxisChange,
  onControllerTypeChange,
}) => {
  const {
    isOpen: isButtonModalOpen,
    onOpen: showButtonModal,
    onClose: hideButtonModal,
  } = useDisclosure();
  const {
    isOpen: isAxisModalOpen,
    onOpen: showAxisModal,
    onClose: hideAxisModal,
  } = useDisclosure();
  const [editingButtonNumber, setEditingButtonNumber] = useState<number>();
  const [editingAxisNumber, setEditingAxisNumber] = useState<number>();

  const onNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  const onButtonClick = useCallback(
    (buttonNumber: number) => {
      setEditingButtonNumber(buttonNumber);
      showButtonModal();
    },
    [showButtonModal]
  );

  const onAxisClick = useCallback(
    (axisNumber: number) => {
      setEditingAxisNumber(axisNumber);
      showAxisModal();
    },
    [showAxisModal]
  );

  const onButtonChangeFromModal = useCallback(
    (button: ControllerButton | null) => {
      if (editingButtonNumber !== undefined) {
        onButtonChange(editingButtonNumber, button);
      }
      hideButtonModal();
    },
    [onButtonChange, hideButtonModal, editingButtonNumber]
  );

  const onAxisChangeFromModal = useCallback(
    (axis: ControllerAxis | null) => {
      if (editingAxisNumber !== undefined) {
        onAxisChange(editingAxisNumber, axis);
      }
      hideAxisModal();
    },
    [onAxisChange, hideAxisModal, editingAxisNumber]
  );

  const ButtonModal = KeyboardAndMouseButtonModal;
  const AxisModal = KeyboardAndMouseAxisModal;

  if (controllerType === ControllerType.MIXED) {
    return <>This controller is unsupported by the controller studio.</>;
  }

  return (
    <HeroPage>
      <ButtonModal
        isOpen={isButtonModalOpen}
        onButtonChange={onButtonChangeFromModal}
        onClose={hideButtonModal}
      />
      <AxisModal
        isOpen={isAxisModalOpen}
        onAxisChange={onAxisChangeFromModal}
        onClose={hideAxisModal}
        axisNumber={editingAxisNumber ?? -1} // Will always be defined when modal is visible
      />
      <Box width="800px" maxWidth="calc(100% - 40px)">
        {isReadOnly ? <Text fontSize="3xl">{name}</Text> : null}
        {!isReadOnly ? (
          <Input
            value={name}
            onChange={onNameInputChange}
            variant="flushed"
            size="lg"
            fontSize="3xl"
          />
        ) : null}
        <Flex mt="20px" flexWrap="wrap">
          <Box mr="10px" mb="10px">
            <Text fontSize="sm" mb="2px">
              Console
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                {...getNonInteractiveButtonProps(isReadOnly)}
              >
                {getGameConsoleName(gameConsole)}{" "}
                {isReadOnly ? null : <ChevronDownIcon />}
              </MenuButton>
              <MenuList>
                {Object.values(GameConsole).map((gameConsole) => (
                  <MenuItem key={gameConsole}>
                    {getGameConsoleName(gameConsole)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
          <Box mb="10px">
            <Text fontSize="sm" mb="2px">
              Controller type
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                {...getNonInteractiveButtonProps(isReadOnly)}
              >
                {getControllerTypeName(controllerType)}{" "}
                {isReadOnly ? null : <ChevronDownIcon />}
              </MenuButton>
              <MenuList>
                {CONTROLLER_TYPE_DISPLAY_ORDER.map((controllerType) => (
                  <MenuItem
                    key={controllerType}
                    onClick={() => onControllerTypeChange(controllerType)}
                  >
                    {getControllerTypeName(controllerType)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
      <ControllerVisualizer
        buttons={buttons}
        axes={axes}
        isReadOnly={!!isReadOnly}
        onButtonClick={onButtonClick}
        onAxisClick={onAxisClick}
      />
    </HeroPage>
  );
};
