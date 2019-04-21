import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {routes} from "../RouteMap";

const Main = () => (
    <>
        <Switch>
            {
                routes.map(route => (
                    <Route
                        exact={route.exact}
                        path={route.path}
                        name={route.name}
                        component={route.component}
                        key={route.name}
                    />
                ))
            }
        </Switch>
    </>
);

export { Main };
