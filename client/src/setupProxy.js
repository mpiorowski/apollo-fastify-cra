const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: process.env.NODE_ENV === "production" ? "http://server:4000" : "http://localhost:4000",
      target: "http://localhost:4000",
      ws: true, // proxy websockets
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    }),
  );
};
