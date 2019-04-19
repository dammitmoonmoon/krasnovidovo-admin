import * as React from "react";
import {Authorization} from "../pages/Authorization";

interface RouteMap {
    path: string;
    exact: boolean;
    name: string;
    component: React.ComponentClass;
}

const Paths = {
    INITIAL: '/',
    HOME: '/home',
};

const routes: RouteMap[] = [
    {
        path: Paths.INITIAL,
        exact: true,
        name: 'Authorization',
        component: Authorization,
    },
];

export {
    Paths,
    routes
};

