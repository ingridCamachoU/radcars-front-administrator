import { createBrowserRouter } from 'react-router-dom';

import Private_layout from '../layout/Private_layout'
import Products_index from '../pages/products_page/Products_index';
import Others_index from '../pages/others_page/Others_index';
import Providers_index from '../pages/providers_page/Providers_index';
import Tasks_index from '../pages/tasks_page/Tasks_index';
import Users_index from '../pages/users_page/Users_index';

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <Private_layout/>,
        children: [

            {
                index: true,
                element: <Products_index />
            },
            {
                path: 'others',
                element: <Others_index />
            },
            {
                path: 'providers',
                element: <Providers_index />
            },
            {
                path: 'tasks',
                element: <Tasks_index />
            },
            {
                path: 'users',
                element: <Users_index />
            },
        ]

    }
]);