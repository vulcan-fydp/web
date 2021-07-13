import { Route, Switch } from "react-router";
import { Home } from "./Home";
import { Dashboard } from "pages/room/Room";
import { LoginRouter } from "pages/login";
import { RoomRouter } from "./room";

export const Pages = () => (
  <Switch>
    {/* These routes are semi-placeholder and subject to change */}
    <Route exact path="/" render={() => <Home />} />

    <Route path="/room" render={() => <RoomRouter />} />
    <Route path="/login" render={() => <LoginRouter />} />

    <Route path="/dashboard" render={() => <Dashboard />} />
    <Route path="/dashboard/controller" />
    <Route path="/dashboard/rooms" />
    <Route path="/dashboard/account" />

    <Route path="/help-center" />
    <Route path="/help-center/:helpCenterArticleGuid" />

    <Route render={() => null} />
  </Switch>
);
