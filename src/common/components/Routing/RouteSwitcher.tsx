import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Dummy} from "../../../modules/Dummy";
import {RouteProtector} from "./RouteProtector/RouteProtector";
import {routes} from "./routes";

const RouteSwitcher = () => (
    <>
        <Switch>
            {
                routes.map(route => (
                    <Route
                        exact={route.exact}
                        path={route.path}
                        name={route.name}
                        component={() => <RouteProtector>{Dummy}</RouteProtector>}
                        key={route.name}
                    />
                ))
            }
        </Switch>
    </>
);

export { RouteSwitcher };
