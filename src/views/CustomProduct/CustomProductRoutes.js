import React, { lazy } from "react";
import Loadable from "components/Loadable/Loadable";

const ListCard = Loadable(lazy(() => import("./ListCard/index")));
const ListItem = Loadable(lazy(() => import('./ListItem/index')))
const TemplateCreate = Loadable(lazy(() => import('./TemplateCreate/TemplateCreate')))

const CustomProductRoutes = [
  {
    path: "/custom",
    children: [
      {
        path: "list",
        element: <ListCard />,
      },
      {
        path: "listItem",
        element: <ListItem />
      },
      {
        path: "templateCreate",
        element: <TemplateCreate />
      }
    ]
  }
];

export default CustomProductRoutes;
