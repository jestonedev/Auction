/**
 * Created by Ignatov on 18.06.2015.
 */
import React from 'react';
import Router from 'react-router';
import { Route, NotFoundRoute, DefaultRoute } from 'react-router';
import App from './App.jsx';
import Users from './Users.jsx';
import Auctions from './Auctions.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import FluxComponent from 'flummox/component';
import Flux from './Flux.jsx'
import performRouteHandlerStaticMethod from './performRouteHandlerStaticMethod.js';

let routes = (
    <Route path="/" handler={App}>
        <Route name="home" path="home" handler={Home}/>
        <Route name="users" path="users" handler={Users}/>
        <Route name="auctions" path="auctions" handler={Auctions}/>
        <Route name="login" path="login" handler={Login}/>
        <Route name="logout" path="logout" handler={Logout}/>
        <NotFoundRoute handler={NotFound}/>
        <DefaultRoute handler={Home} />
    </Route>
);

let flux = new Flux();

Router.run(routes, Router.HashLocation, (Root, state) => {
    const routeHandlerInfo = { state, flux };
    performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);
    React.render(
        <FluxComponent flux={flux}>
            <Root {...state} />
        </FluxComponent>,
        document.body
    );
});