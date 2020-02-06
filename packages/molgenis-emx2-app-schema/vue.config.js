module.exports = {
  publicPath: '', // to ensure relative paths are used
  devServer: {
    port: 9000,
    proxy: {
      '^/api': { target: 'http://localhost:8080' }
    }
  }
}
