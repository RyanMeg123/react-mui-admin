import React, {lazy} from 'react';
import Loadable from 'components/Loadable/Loadable'

const Home = Loadable(lazy(() => import('./Home')))

const HomeRoutes = [
    {
        path: '/home',
        element: <Home />,
    },
]

export default HomeRoutes;
