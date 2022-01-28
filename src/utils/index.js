// 获取cookie
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (const item of ca) {
    let c = item.trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
// tree
export function getTreeParentChilds(childs, findKey) {
  let parentChilds = [];
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.key !== findKey && item.children && item.children.length > 0) {
      parentChilds = getTreeParentChilds(item.children, findKey);
    }
    if (item.key === findKey) {
      parentChilds = childs;
    }
    if (parentChilds.length > 0) {
      break;
    }
  }
  return parentChilds;
}
export function getTreeDataByKey(childs = [], findKey) {
  let findItem = null;
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.id !== findKey && item.children && item.children.length > 0) {
      findItem = getTreeDataByKey(item.children, findKey);
    }
    if (item.id === findKey) {
      findItem = item;
    }
    if (findItem != null) {
      break;
    }
  }
  return findItem;
}
export function getTreeRules(childs = []) {
  let rulesData = [];
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.children && item.children.length > 0) {
      rulesData = rulesData.concat(getTreeRules(item.children));
    }
    rulesData.push(item.rules);
  }
  return rulesData;
}
export function getTreeRulesConfig(childs = []) {
  let rulesConfig = [];
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.children && item.children.length > 0) {
      rulesConfig = rulesConfig.concat(getTreeRulesConfig(item.children));
    }
    rulesConfig.push(item.contents.rulesConfig);
  }
  return rulesConfig;
}
export function getKey(childs = []) {
  let key = [];
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.children && item.children.length > 0) {
      key = key.concat(getKey(item.children));
    }
    key.push(item.key);
  }
  return key;
}
export function isHasChildren(childs) {
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (!item.hasOwnProperty("children")) {
      console.log("没有");
      item.children = [];
    } else {
      isHasChildren(item.children);
    }
  }
  return childs;
}
export function treeDataHasChild(childs, findKey) {
  let hasChild;
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i];
    if (item.key !== findKey && item.children && item.children.length > 0) {
      hasChild = true;
    } else {
      hasChild = false;
    }
  }
  return hasChild;
}
// 封装下载文件函数
export function downLoadFile(file, gameCode, activeName) {
  let blob = new Blob([file], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });
  // 兼容IE10
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, `${gameCode}${activeName}下载数据.csv`);
  } else {
    // 兼容谷歌和火狐
    let objectUrl = URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.href = objectUrl;
    downloadLink.download = `${gameCode}${activeName}下载数据.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
  }
}
// 下载json 文件
export function downLoadJSON(data, gameCode, name) {
  let res = JSON.stringify(data);
  let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(res);
  //通过创建a标签实现
  let link = document.createElement("a");
  link.href = uri;
  //对下载的文件命名
  link.download = `${gameCode}-${name}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// deep clone
export function deepClone(target, map = new Map()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
