// import AuthGuard from 'auth/AuthGuard'
import NotFound from 'views/NotFound'
// import Home froviews/dashboard/Homeome'
// import chartsRoute from 'views/charts/ChartsRoute'
// import materialRoutes from 'views/material-kit/MaterialRoutes'
import dashboardRoutes from 'views/dashboard/DashboardRoutes'
import homeRoutes from 'views/home/HomeRoutes'
import registerRoutes from 'views/Register/RegisterRoutes'
import managementRoutes from 'views/Management/ManagementRoutes'
// import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                // <AuthGuard>
                    <MatxLayout />
                // </AuthGuard>
            ),
            children: [...dashboardRoutes,...homeRoutes,...registerRoutes,...managementRoutes],
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
