module.exports = function (gulp, plugins, options, webpackConfig) {
  var webpack = require("webpack"),
      WebpackDevServer = require("webpack-dev-server"),
      clone = require('lodash/lang/clone'),
      serverConfig;

    webpackConfig = clone(webpackConfig);
    webpackConfig.devtool = 'eval';
    webpackConfig.debug = !(options.env === 'prod');

    serverConfig = clone(webpackConfig.devServer);

    return function () {
        var compiler = webpack(webpackConfig),
            server = new WebpackDevServer(compiler);

        server.listen(8080, "localhost", function(err) {
          if(err) throw new gutil.PluginError("webpack-dev-server", err);
          require('gutil').log("[server]", webpackConfig.output.path + '/index.html');
        });

        return server;
    }
};
