import {Authorization} from "../pages/Authorization";

interface RouteMap {
    path: string;
    exact: boolean;
    name: string;
    component: any;
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

