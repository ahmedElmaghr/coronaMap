import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// window.screen.orientation.lock('landscape');

ReactDOM.render(
    <React.StrictMode>
        <HashRouter >
            <App />
        </HashRouter>
    </React.StrictMode>
, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
