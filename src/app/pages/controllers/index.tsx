import { Route, Routes } from "react-router-dom";
import { CreateControllerModal } from "./CreateControllerModal";
import { ControllerLists } from "./list";
import { DefaultControllerStudio } from "./studio/DefaultControllerStudio";
import { ControllerEditStudio } from "./studio/ControllerEditStudio";
import { ControllerType } from "./studio/enums/controller-type";
import { GameConsole } from "./studio/enums/game-console";
import { CreateControllerStudio } from "./studio/CreateControllerStudio";

export const ControllersRouter = () => {
  return (
    <>
      <CreateControllerModal />
      <Routes>
        <Route index element={<ControllerLists />} />
        <Route path="built-in" element={<ControllerLists />} />
        <Route
          path="built-in/:controllerId"
          element={<DefaultControllerStudio />}
        />
        <Route path="create" element={<CreateControllerStudio />} />
        <Route path=":controllerId" element={<ControllerEditStudio />} />
        <Route path="*" element={<>not found</>} />
      </Routes>
    </>
  );
};

ControllersRouter.baseRoute = () => {
  return "/controllers";
};

ControllersRouter.userControllerList = () => {
  return `${ControllersRouter.baseRoute()}`;
};

ControllersRouter.builtInControllerList = () => {
  return `${ControllersRouter.baseRoute()}/built-in`;
};

ControllersRouter.userController = (controllerId = ":controllerId") => {
  return `${ControllersRouter.userControllerList()}/${controllerId}`;
};

ControllersRouter.builtInController = (controllerId = ":controllerId") => {
  return `${ControllersRouter.builtInControllerList()}/${controllerId}`;
};

// @todo: Remove hardcoded values
ControllersRouter.createUserController = ({
  controllerType,
  gameConsole,
}: Partial<{
  controllerType: ControllerType;
  gameConsole: GameConsole;
}> = {}) => {
  const params = new URLSearchParams();

  if (controllerType) {
    params.set("controller_type", controllerType);
  }

  if (gameConsole) {
    params.set("game_console", gameConsole);
  }

  return `${ControllersRouter.baseRoute()}/create`;
};
