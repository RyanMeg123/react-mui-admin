import AuthGuard from 'auth/AuthGuard'
import NotFound from 'views/NotFound'
// import chartsRoute from 'views/charts/ChartsRoute'
// import materialRoutes from 'views/material-kit/MaterialRoutes'
import dashboardRoutes from 'views/dashboard/DashboardRoutes'
// import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes],
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
