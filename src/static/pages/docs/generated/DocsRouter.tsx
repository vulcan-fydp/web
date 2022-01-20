import { Route, Switch } from "react-router";
import React from "react";
const DocDocs = React.lazy(() => import("./DocDocs.generated"));
const DocAws = React.lazy(() => import("./DocAws.generated"));
const DocAzure = React.lazy(() => import("./DocAzure.generated"));
const DocGcp = React.lazy(() => import("./DocGcp.generated"));
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
      <Route exact path="/docs" render={createLazyDoc(DocDocs)} />
      <Route exact path="/docs/deploying/aws" render={createLazyDoc(DocAws)} />
      <Route exact path="/docs/deploying/azure" render={createLazyDoc(DocAzure)} />
      <Route exact path="/docs/deploying/gcp" render={createLazyDoc(DocGcp)} />
      <Route exact path="/docs/vulcast" render={createLazyDoc(DocVulcast)} />
      <Route exact path="/docs/vulcast/creating-a-vulcast" render={createLazyDoc(DocCreatingAVulcast)} />
    </Switch>
  );
};
