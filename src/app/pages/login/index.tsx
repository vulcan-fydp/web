import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { LoginPage } from "./Login";

export const LoginRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} render={() => <LoginPage />} />
      <Route exact path={`${path}/forgot-password`} render={() => null} />
      <Route exact path={`${path}/google`} render={() => null} />
      <Route exact path={`${path}/facebook`} render={() => null} />
    </Switch>
  );
};
