export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/default",
    icon: "dashboard"
  },
  {
    name: "Home",
    path: "/home",
    icon: "home"
  },
  {
    name: "预注册管理",
    path: "/register",
    icon: "dns",
    children: [
      {
        name: "预注册用户信息查询",
        iconText: "SI",
        path: "/register/searh"
      }
    ]
  },
  {
    name: "集结管理",
    path: "/management",
    icon: "manage_history",
    children: [
      {
        name: "集结数据管理",
        iconText: "SI",
        path: "/management/data"
      },
      {
        name: "操作日志",
        iconText: "SI",
        path: "/management/log"
      }
    ]
  },
  {
    name: "留言管理",
    path: "/message",
    icon: "mail",
    children: [
      {
        name: "留言筛选",
        iconText: "SI",
        path: "/message/search"
      }
    ]
  },
  {
    name: "定制化产品管理",
    path: "/custom",
    icon: "outlet",
    children: [
      {
        name: "定制化产品列表",
        iconText: "SI",
        path: "/custom/list"
      }
    ]
  },
];
