import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { StreamTab } from "pages/room/StreamTab";
import { ControllerSettingsTab } from "pages/room/ControllerSettingsTab";
import { PlayersTab } from "pages/room/PlayersTab";

export const RoomRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => null} />
      <Route exact path={`${path}/:roomGuid`} render={() => null} />
      <Route exact path={`${path}/:roomGuid/stream`} render={() => <StreamTab />} />
      <Route exact path={`${path}/:roomGuid/controller`} render={() => <ControllerSettingsTab />} />
      <Route exact path={`${path}/:roomGuid/players`} render={() => <PlayersTab />} />
    </Switch>
  );
};
