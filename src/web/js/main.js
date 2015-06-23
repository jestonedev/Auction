/**
 * Created by Ignatov on 18.06.2015.
 */
import React from 'react';
import Router from 'react-router';
import { Route, NotFoundRoute, DefaultRoute } from 'react-router';
import App from './App';
import Users from './Users';
import Auctions from './Auctions';
import Home from './Home';
import NotFound from './NotFound';
import FluxComponent from 'flummox/component';
import Flux from './Flux'
import performRouteHandlerStaticMethod from './performRouteHandlerStaticMethod.js';

let routes = (
    <Route handler={App}>
        <Route name="users" path="users" handler={Users}/>
        <Route name="auctions" path="auctions" handler={Auctions}/>
        <NotFoundRoute handler={NotFound}/>
        <Route name="home" path="/" handler={Home}/>
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