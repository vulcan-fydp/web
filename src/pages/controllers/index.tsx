import { addQueryStringIfNonEmpty } from "lib/uri";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { CreateControllerModal } from "./CreateControllerModal";
import { ControllerLists } from "./list";
import { DefaultControllerStudio } from "./studio/DefaultControllerStudio";
import { ControllerEditStudio } from "./studio/ControllerEditStudio";
import { ControllerType } from "./studio/enums/controller-type";
import { GameConsole } from "./studio/enums/game-console";

export const ControllersRouter = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <CreateControllerModal />
      <Switch>
        <Route
          exact
          path={ControllersRouter.userControllerList()}
          render={() => <ControllerLists />}
        />
        <Route
          exact
          path={ControllersRouter.builtInControllerList()}
          render={() => <ControllerLists />}
        />
        <Route
          exact
          path={ControllersRouter.createUserController()}
          render={() => null}
        />
        <Route
          exact
          path={ControllersRouter.userController()}
          render={() => <ControllerEditStudio />}
        />
        <Route
          exact
          path={ControllersRouter.builtInController()}
          render={() => <DefaultControllerStudio />}
        />
      </Switch>
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

  return `${ControllersRouter.baseRoute()}/create${addQueryStringIfNonEmpty(
    params
  )}`;
};
