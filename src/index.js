import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserHistory } from "history";
import { HashRouter, Route } from "react-router-dom";
// import UI from "./UI.js";

import * as serviceWorker from "./serviceWorker";
// import rms from "./rms.js";
// import rmssub from "./rmssub.js";
// import iaas from './iaas.js'
// import farmer from './newfarmer.js'
// import rmsedit from './rmsedit.js';
// import farmeredit from './farmeredit.js';
// import iaasmobile from './iaasmobile.js';
import Highcharts from "highcharts/highstock";
const borderRadius = require("highcharts-border-radius");
borderRadius(Highcharts);
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const UI = lazy(() => import("./UI.js"));
const rms = lazy(() => import("./rms.js"));
const rmssub = lazy(() => import("./rmssub.js"));
const iaas = lazy(() => import("./iaas.js"));
const farmer = lazy(() => import("./newfarmer.js"));
const rmsedit = lazy(() => import("./rmsedit.js"));
const farmeredit = lazy(() => import("./farmeredit.js"));
const iaasmobile = lazy(() => import("./iaasmobile.js"));

ReactDOM.render(
  <HashRouter basename={"/"}>
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/" component={UI} />
      <Route exact path="/rms" component={rms} />
      <Route exact path="/rmsedit" component={rmsedit} />
      <Route exact path="/farmer" component={farmer} />
      <Route exact path="/iaas" component={iaas} />
      <Route exact path="/rms/:id" component={rmssub} />
      <Route exact path="/farmeredit" component={farmeredit} />
      <Route exact path="/iaasmobile" component={iaasmobile} />
    </Suspense>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
