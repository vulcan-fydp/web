import { Route, Switch } from "react-router";
import { Home } from "./Home";
import { LoginRouter } from "pages/login";
import { RoomRouter } from "./room";
import { ControllersRouter } from "./controllers";
import { DocsRouter, DocsRoutes } from "./docs";
import { AccountPage } from "./account";

export const Pages = () => (
  <Switch>
    {/* These routes are semi-placeholder and subject to change */}
    <Route exact path="/" render={() => <Home />} />

    <Route path="/room" render={() => <RoomRouter />} />
    <Route path="/login" render={() => <LoginRouter />} />
    <Route path="/controllers" render={() => <ControllersRouter />} />
    <Route exact path="/account" render={() => <AccountPage />} />

    <Route path={DocsRoutes.base()} render={() => <DocsRouter />} />

    <Route render={() => null} />
  </Switch>
);
