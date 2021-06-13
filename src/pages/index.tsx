import { Route, Switch } from "react-router";
import { Home } from "./Home";

export const Pages = () => (
  <Switch>
    {/* These routes are semi-placeholder and subject to change */}
    <Route path="/" render={() => <Home />} />

    <Route path="/room/:roomGuid" />

    <Route path="/dashboard" />
    <Route path="/dashboard/controller" />
    <Route path="/dashboard/rooms" />
    <Route path="/dashboard/account" />

    <Route path="/help-center" />
    <Route path="/help-center/:helpCenterArticleGuid" />

    <Route render={() => null} />
  </Switch>
);
