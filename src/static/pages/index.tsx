import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DocsPage } from "./docs";
import { HomePage } from "./home";

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/docs" component={DocsPage} />
    </Switch>
  </BrowserRouter>
);
