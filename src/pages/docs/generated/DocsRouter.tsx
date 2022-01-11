import { Route, Switch } from "react-router";
import React from "react";
const DocVulcast = React.lazy(() => import("./DocVulcast.generated"));
const DocCreatingAVulcast = React.lazy(() => import("./DocCreatingAVulcast.generated"));

function createLazyDoc(
  Component: React.LazyExoticComponent<() => JSX.Element>
) {
  return () => (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

export const DocsRouter = () => {
  return (
    <Switch>
      <Route exact path="/docs/vulcast" render={createLazyDoc(DocVulcast)} />
      <Route exact path="/docs/vulcast/creating-a-vulcast" render={createLazyDoc(DocCreatingAVulcast)} />
    </Switch>
  );
};
