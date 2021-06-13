import { Route, Switch } from "react-router";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard/dashboard";

export const Pages = () => (
  <Switch>
    {/* These routes are semi-placeholder and subject to change */}
    <Route path="/room/:roomGuid" />

    <Route path="/dashboard" render={() => <Dashboard />} />
    <Route path="/dashboard/controller" />
    <Route path="/dashboard/rooms" />
    <Route path="/dashboard/account" />

    <Route path="/help-center" />
    <Route path="/help-center/:helpCenterArticleGuid" />

    <Route path="/" render={() => <Home />} />

    <Route render={() => null} />
  </Switch>
);
