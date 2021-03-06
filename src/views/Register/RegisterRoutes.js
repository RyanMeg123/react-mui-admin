import React, { lazy } from 'react';
import Loadable from 'components/Loadable/Loadable';

const Register = Loadable(lazy(() => import('./Register')))

const RegisterRoutes = [
    {
        path: '/register/searh',
        element: <Register/>
    }
]

export default RegisterRoutes;