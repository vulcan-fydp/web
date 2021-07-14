import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { Dashboard } from "pages/room/Room";

export const RoomRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:roomGuid`} render={() => null} />
      <Route path={`${path}/:roomGuid`} render={() => <Dashboard />} />
    </Switch>
  );
};
