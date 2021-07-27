import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { Dashboard } from "pages/room/Room";
import { JoinOrHostRoom } from "./JoinOrHostRoom";

export const RoomRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => <JoinOrHostRoom />} />
      <Route exact path={`${path}/:roomId`} render={() => <JoinOrHostRoom />} />
      <Route path={`${path}/:roomId`} render={() => <Dashboard />} />
    </Switch>
  );
};
