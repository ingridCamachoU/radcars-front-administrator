import { createBrowserRouter } from 'react-router-dom';
import PrivateLayout from '../layout/PrivateLayout'
import ProductsIndex from '../pages/products_page/ProductsIndex';
import OthersIndex from '../pages/others_page/OthersIndex';
import ProvidersIndex from '../pages/providers_page/ProvidersIndex';
import TasksIndex from '../pages/tasks_page/TasksIndex';
import LoginIndex from '../pages/login_page/LoginIndex';
import RegisterIndex from '../pages/login_page/register_page/RegisterIndex';
import NotFoundIndex from '../pages/not_found_page/NotFoundIndex';
import PublicLayout from '../layout/PublicLayout';
import UserIndex from '../pages/users_page/UserIndex';

export const router = createBrowserRouter ([
    {   
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <LoginIndex />,
            },
            {
                path: 'register',
                element: <RegisterIndex />
            },
            {
                path: '/*',
                element: <NotFoundIndex />
            },
            {
                path: "private",
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
                        element: <UserIndex />
                    },
                ]
        
            }
        ]
        
    }
]);