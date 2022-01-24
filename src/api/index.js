import { get, put, post, patch, Delete } from "utils/request.js";
import { getODP } from "utils/requestODP.js";
// 预注册用户查询
export const preRegister = params => get("/api/pre-register/list", params);
// 预注册用户数据下载(csv文件)
export const download = params =>
  get("/api/pre-register/download", params, {
    responseType: "blob"
  });
// 集结数编辑
export const peopleCountsEdit = params =>
  put("/api/people-counts/edit", params);
// 集结配置获取
export const peopleCountLog = params =>
  get("/api/people-count-logs/list", params);
// 集结操作日志列表
export const peopleCountsConfig = params =>
  get("/api/people-counts/config", params);
// 授权的游戏列表(同步core游戏数据)
export const accessGames = params => get("/api/core/access-games", params);
// 用户信息(同步core用户信息)
export const coreUser = params =>
  get("/api/core/user", params, {
    isToken: true
  });
// 退出登陆
export const logout = params =>
  post("/auth/logout", params, {
    isToken: true
  });
// 预注册用户国家列表
export const countryList = params =>
  get("/api/pre-register/country-list", params);

// 区服管理
export const serversList = (params, gameCode) =>
  getODP(`/v6.0.0/games/${gameCode}/servers`, params);
// 留言状态修改
export const messageStatus = params => patch("/api/message/status", params);
// 留言查询
export const messageList = params => get("/api/message/list", params);
//创建活动
export const activitiesCreate = params =>
  post("/api/activities/create", params);
//活动列表
export const activitiesList = params => get("/api/activities/list", params);
// 名字修改
export const editActiveName = (params, id) =>
  patch(`/api/activities/name/${id}`, params);
// 状态修改
export const activeStatus = (params, id) =>
  patch(`/api/activities/status/${id}`, params);
//复制创建
export const activitiesCopy = (params, id) =>
  post(`/api/activities/copy/${id}`, params);
// 模版配置
export const templateConfig = (params, id) =>
  put(`/api/activities/template-config/${id}`, params, {
    isToken: true
  });
// 素材配置
export const contentConfig = (params, id) =>
  put(`/api/activities/content-config/${id}`, params);
// 规则配置
export const ruleConfig = (params, id) =>
  put(`/api/activities/rule-config/${id}`, params);
// 删除活动列表
export const activitiesDelete = (params, id) =>
  Delete(`/api/activities/delete/${id}`, params);
// 数据统计
export const getStatistics = (params, id) =>
  get(`/api/activities/statistics/${id}`, params);
// 数据统计下载
export const statisticsDownload = (params, id) =>
  get(`/api/activities/statistics-download/${id}`, params);
// region
export const region = () => get(`/api/core/region`);
// 详情
export const activeDetail = (params, id) =>
  get(`/api/activities/detail/${id}`, params);
// ces上传
// export const cesUpload = params => POST("/api/ces/upload", params);

// 专题产品列表
export const getProductsList = params => {
  return get("/api/products/list", params);
};
// 专题产品创建
export const productsCreate = params => {
  return post("/api/products/create", params);
};
// 专题产品编辑
export const productsEdit = (id, params) => {
  return put(`/api/products/edit/${id}`, params);
};
// 下载活动列表配置
export const activeExport = id => {
  return get(`/api/activities/export/${id}`);
};
// 留言详情

export const messageDetail = id => {
  return get(`/api/message/detail/${id}`);
};
// 留言点赞数修改
export const messageLikeNum = (id, params) => {
  return put(`/api/message/likeNum/${id}`, params);
};
// // 留言状态修改
// export const messageStatus = (params) => {
//   return put(`/api/message/status`, params);
// };

