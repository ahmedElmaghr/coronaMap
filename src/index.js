import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from "react-router-dom";
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GA from './Utils/GoogleAnalytics'


const hist = createBrowserHistory();
ReactDOM.render(

<App>
    {GA.init() && <GA.RouteTracker />}
</App> 
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
