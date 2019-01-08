import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from 'history';
// import App from './App';
// import SiteMapGoogle from './SiteMapGoogle.js';
// import Maps from './Maps.js'
import UI from	'./UI.js'
// import Reactmaps from './ReactMap.js'
import * as serviceWorker from './serviceWorker';

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

ReactDOM.render(<UI />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
