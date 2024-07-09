const PROXY_CONFIG = [
  {
    context: ["/v1"],
    target: "https://receitaws.com.br",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": "",
    },
  },
  {
    context: ["/ws"],
    target: "https://viacep.com.br",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": "",
    },
  },
];

module.exports = PROXY_CONFIG;
