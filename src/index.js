import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserHistory } from "history";
import { HashRouter , Route } from "react-router-dom";
import UI from "./UI.js";
import * as serviceWorker from "./serviceWorker";
import rms from "./rms.js";
import rmssub from "./rmssub.js";
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

ReactDOM.render(
  <HashRouter basename={'/'}>
    <div>
      <Route exact path="/" component={UI} />
      <Route exact path="/rms" component={rms} />
      <Route exact path="/rms/:id" component={rmssub} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
