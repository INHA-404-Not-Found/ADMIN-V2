const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://be-v2.onrender.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    }),
  );
};
