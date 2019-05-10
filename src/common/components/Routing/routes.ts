import {ComponentClass, FunctionComponent} from "react";
import {Associate} from "../../../modules/Associates";
import {Dummy} from "../../../modules/Dummy";

interface Routes {
    path: string;
    exact: boolean;
    name: string;
    component: FunctionComponent|ComponentClass<any>;
}

const Paths = {
    INITIAL: '/',
    HOME: '/home',
    CKEDITOR: '/ckeditor',
    ASSOCIATE_CREATE: '/create-associate',
    ASSOCIATE_EDIT: '/edit-associate/:id',
};

const routes: Routes[] = [
    {
        path: Paths.INITIAL,
        exact: true,
        name: 'Dummy',
        component: Dummy,
    },
    {
        path: Paths.ASSOCIATE_CREATE,
        exact: true,
        name: 'Associate',
        component: Associate,
    },
    {
        path: Paths.ASSOCIATE_EDIT,
        exact: true,
        name: 'Associate',
        component: Associate,
    },
];

export {
    Paths,
    routes
};

