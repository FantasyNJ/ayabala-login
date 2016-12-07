import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Redirect, IndexRedirect } from 'react-router';
import Body from './Body';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Body}>
            <IndexRedirect to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Route>
    </Router>
    ,
    document.getElementById('app')
);



