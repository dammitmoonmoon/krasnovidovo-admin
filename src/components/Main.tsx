import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Dummy} from "./Dummy";
import {RouteMap} from "./RouteMap";

const Main = () => (
    <>
        <Switch>
            <Route exact path="/" name="Main Page" component={Dummy} />
            <Route
                path={`/${RouteMap.staff}`}
                name="Staff Page"
                component={Dummy}
            />
            <Route component={Dummy} />
        </Switch>
    </>
);

export { Main };
