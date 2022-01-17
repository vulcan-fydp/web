import { Route, Switch } from "react-router";
import { Docs } from "./Docs";

export const DocsRouter = () => {
  return (
    <Switch>
      <Route exact path={DocsRoutes.base()} render={Docs} />
      <Route path={DocsRoutes.vulcast()} render={() => null} />
    </Switch>
  );
};

export const DocsRoutes = {
  base: () => "/docs",
  vulcast: () => DocsRoutes.base() + "/vulcast",
};
