import React,{lazy} from 'react'
import Loadable from 'components/Loadable/Loadable'

const MessageData = Loadable(lazy(() => import('./index')))

const MessageRoutes = [
    {
        path: '/message/search',
        element: <MessageData/>
    },
]

export default MessageRoutes