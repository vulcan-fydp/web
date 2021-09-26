import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ControllerLists } from "./list";

export const ControllersRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => <ControllerLists />} />
      <Route
        exact
        path={`${path}/built-in`}
        render={() => <ControllerLists />}
      />
      <Route exact path={`${path}/:controllerGuid`} render={() => null} />
      <Route
        exact
        path={`${path}/built-in/:controllerGuid`}
        render={() => null}
      />
    </Switch>
  );
};
