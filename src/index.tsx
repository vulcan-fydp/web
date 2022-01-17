import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

let App: React.ComponentType = () => (
  <>Target set to invalid value of {process.env.REACT_APP_TARGET}</>
);
if (process.env.REACT_APP_TARGET === "app") {
  App = React.lazy(() => import(/* webpackMode: "eager" */ "./app"));
} else if (process.env.REACT_APP_TARGET === "static") {
  App = React.lazy(() => import(/* webpackMode: "eager" */ "./static"));
}

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
