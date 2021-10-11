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
} from "@chakra-ui/react";
import { ControllerAxis, ControllerButton } from "backend-types";
import { HeroPage } from "components/HeroPage";
import React, { useCallback } from "react";
import { ControllerType, getControllerTypeName } from "./enums/controller-type";
import { GameConsole, getGameConsoleName } from "./enums/game-console";

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
  onControllerTypeChange: (controllerType: ControllerType) => void;
  onNameChange: (name: string) => void;
  isReadOnly?: boolean;
}

export const ControllerStudio: React.FC<ControllerStudioProps> = ({
  isReadOnly,
  buttons,
  gameConsole,
  controllerType,
  name,
  onNameChange,
}) => {
  const onNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onNameChange(e.target.value);
    },
    [onNameChange]
  );

  return (
    <HeroPage>
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
              <MenuButton as={Button} disabled={isReadOnly} variant="outline">
                {getGameConsoleName(gameConsole)} <ChevronDownIcon />
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
              <MenuButton as={Button} disabled={isReadOnly} variant="outline">
                {getControllerTypeName(controllerType)} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                {Object.values(ControllerType).map((controllerType) => (
                  <MenuItem key={controllerType}>
                    {getControllerTypeName(controllerType)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </HeroPage>
  );
};
