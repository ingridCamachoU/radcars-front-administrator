import { createBrowserRouter } from 'react-router-dom';
import PrivateLayout from '../layout/PrivateLayout'
import ProductsIndex from '../pages/products_page/ProductsIndex';
import OthersIndex from '../pages/others_page/OthersIndex';
import ProvidersIndex from '../pages/providers_page/ProvidersIndex';
import TasksIndex from '../pages/tasks_page/TasksIndex';
import UsersIndex from '../pages/users_page/UsersIndex';

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <PrivateLayout/>,
        children: [

            {
                index: true,
                element: <ProductsIndex />
            },
            {
                path: 'others',
                element: <OthersIndex />
            },
            {
                path: 'providers',
                element: <ProvidersIndex />
            },
            {
                path: 'tasks',
                element: <TasksIndex />
            },
            {
                path: 'users',
                element: <UsersIndex />
            },
        ]

    }
]);