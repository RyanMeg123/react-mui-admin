import React, { lazy } from 'react';
import Loadable from 'components/Loadable/Loadable';

const ManagementData = Loadable(lazy(() => import('./ManagementData')))
const ManagementLog = Loadable(lazy(() => import('./ManagementLog')))

const RegisterRoutes = [
    {
        path: '/management/data',
        element: <ManagementData/>
    },
    {
        path: '/management/log',
        element: <ManagementLog/>
    }
]

export default RegisterRoutes;