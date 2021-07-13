import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";

export const RoomRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => null} />
      <Route exact path={`${path}/:roomGuid`} render={() => null} />
      <Route exact path={`${path}/:roomGuid/stream`} render={() => null} />
      <Route exact path={`${path}/:roomGuid/controller`} render={() => null} />
      <Route exact path={`${path}/:roomGuid/players`} render={() => null} />
    </Switch>
  );
};
