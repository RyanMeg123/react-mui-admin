import React, { lazy } from "react";
import Loadable from "components/Loadable/Loadable";

const CustomProduct = Loadable(lazy(() => import("./index")));
const ListCard = Loadable(lazy(() => import("./ListCard/index")));

const CustomProductRoutes = [
  {
    path: "/custom",
    children: [
      {
        path: "list",
        element: <ListCard />
      }
    ]
  }
];

export default CustomProductRoutes;
