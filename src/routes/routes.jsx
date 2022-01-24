import NotFound from 'views/NotFound'
import dashboardRoutes from 'views/dashboard/DashboardRoutes'
import homeRoutes from 'views/home/HomeRoutes'
import registerRoutes from 'views/Register/RegisterRoutes'
import managementRoutes from 'views/Management/ManagementRoutes'
import messageRoutes from 'views/Message/MessageRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                    <MatxLayout />
            ),
            children: [...dashboardRoutes,...homeRoutes,...registerRoutes,...managementRoutes,...messageRoutes],
        },
        // ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
