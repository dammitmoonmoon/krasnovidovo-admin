import {Dummy} from "../../../modules/Dummy";

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
        name: 'Dummy',
        component: Dummy,
    },
];

export {
    Paths,
    routes
};

