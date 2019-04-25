import {FunctionComponent} from "react";
import {Authorization} from "../pages/Authorization";
import {Test} from "../pages/test";

interface RouteMap {
    path: string;
    exact: boolean;
    name: string;
    component: FunctionComponent;
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
    {
        path: Paths.HOME,
        exact: true,
        name: 'Test',
        component: Test,
    },
];

export {
    Paths,
    routes
};

