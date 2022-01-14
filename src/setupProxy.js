const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      //`api`是需要转发的请求
      target: "https://panel-cstp.oasgames.com", // 这里是接口服务器地址
      changeOrigin: true,
      secure: false
    }),
    proxy.createProxyMiddleware("/auth", {
      //`api`是需要转发的请求
      target: "https://panel-cstp.oasgames.com", // 这里是接口服务器地址
      changeOrigin: true,
      secure: false,
    })
  );
};



