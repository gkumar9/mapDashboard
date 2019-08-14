import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserHistory } from "history";
import { HashRouter, Route } from "react-router-dom";
// import { BrowserRouter as Router , Route } from "react-router-dom";
import UI from "./UI.js";
import * as serviceWorker from "./serviceWorker";
import Rms from "./components/rms/rms.js";
import Rmssub from "./components/rms/rmssub.js";
import Iaas from "./components/iaas/iaas.js";
import Farmer from "./components/farmer/newfarmer.js";
import Rmsedit from "./components/rms/rmsedit.js";
import Farmeredit from "./components/farmer/farmeredit.js";
import Iaasmobile from "./components/iaas/iaasmobile.js";
import Agroassets from './components/agro/agro.js'
import Highcharts from "highcharts/highstock";
import Keycloak from "keycloak-js";
import axios from "axios";
import Swal from "sweetalert2";
const borderRadius = require("highcharts-border-radius");
borderRadius(Highcharts);
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const kc = new Keycloak({
  realm: "claro",
  url: "//sso.claroenergy.in/auth/",
  "ssl-required": "none",
  resource: "claro-apps",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  clientId: "claro-apps"
  // "clientSecret":"",
  // "enable-cors": true
});
let app = (
  <HashRouter basename={"/"}>
    <div>
      <Route
        exact
        path="/"
        render={props => {
          return <UI {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/rms"
        render={props => {
          return <Rms {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/rmsedit"
        render={props => {
          return <Rmsedit {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/farmer"
        render={props => {
          return <Farmer {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/iaas"
        render={props => {
          return <Iaas {...props} kc={kc} />;
        }}
      />
      <Route
        path="/rms/:id"
        exact
        render={props => {
          return <Rmssub {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/farmeredit"
        render={props => {
          return <Farmeredit {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/iaasmobile"
        render={props => {
          return <Iaasmobile {...props} kc={kc} />;
        }}
      />
      <Route
        exact
        path="/agroassets"
        render={props => {
          return <Agroassets {...props} kc={kc} />;
        }}
      />
    </div>
  </HashRouter>
);
kc.init({ onLoad: "login-required",checkLoginIframe: false })
  .success(authenticated => {
    console.log( kc);
    if (authenticated) {
      ReactDOM.render(app, document.getElementById("root"));
    }
  })
  .error(e => {
    Swal({
      type: "error",
      title: "Error Authentication"
    });
  });

axios.interceptors.request.use(config => {
  // kc.updateToken(15)
  //   .success(function() {
  //     console.log("token update success");
  //   })
  //   .error(function() {
  //     console.log("Failed to refresh token");
  //   });
  config.headers.Authorization = "Bearer " + kc.token;
  return Promise.resolve(config);
});

// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   console.log('intercepetor',response)
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
