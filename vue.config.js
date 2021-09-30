module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/painal/",
  devServer: {
    port: 8082,
  },
};
