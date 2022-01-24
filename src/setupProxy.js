const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware("/api", {
      target: "https://panel-cstp.oasgames.com", // 这里是接口服务器地址
      changeOrigin: true,
      secure: false
    }),
    proxy.createProxyMiddleware("/auth", {
      target: "https://panel-cstp.oasgames.com", // 这里是接口服务器地址
      changeOrigin: true,
      secure: false,
    }),
    proxy.createProxyMiddleware("/v6.0.0", {
      //`api`是需要转发的请求
      target: "https://udp6.oasgames.com", // 这里是接口服务器地址
      changeOrigin: true,
      secure: false,
    })

  );
};



