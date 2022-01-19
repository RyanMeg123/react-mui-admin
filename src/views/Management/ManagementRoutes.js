import React, { lazy } from 'react';
import Loadable from 'components/Loadable/Loadable';

const Management = Loadable(lazy(() => import('./ManagementData')))

const RegisterRoutes = [
    {
        path: '/management/data',
        element: <Management/>
    }
]

export default RegisterRoutes;