import {Test} from "../../../modules/test";

interface Routes {
    path: string;
    exact: boolean;
    name: string;
    component: React.ReactNode;
}

const Paths = {
    INITIAL: '/',
    HOME: '/home',
};

const routes: Routes[] = [
    {
        path: Paths.INITIAL,
        exact: true,
        name: 'Test',
        component: Test,
    },
];

export {
    Paths,
    routes
};

