var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache  : true,
  debug  : true,
  context: path.join(__dirname, 'src'),
  entry  : './springatom.js',
  output: {
    path      : path.join(__dirname, 'build'),
    publicPath: '/assets/',
    output    : 'app.js'
  },
  resolve: {
    root    : [path.join(__dirname, 'bower_components')],
    alias   : {
      common  : [path.join(__dirname, './src/common')]
    }
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'baggage?[file].html' }
    ],
    loaders: [
      {
        test: /\.tpl.html$/,
        loader: "ngtemplate-loader2!html?module=springatom.views&relativeTo=" + (path.resolve(__dirname, './src/'))
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  },
  plugins: [
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  devServer : {
    contentBase: path.join(__dirname, 'build'),
    quiet      : false,
    noInfo     : false,
    lazy       : true,
    hot        : true,
    inline     : true,
    filename   : "springatom.js",
    watchOptions: {
     aggregateTimeout: 300,
     poll            : 1000
   },
   stats       : {
     colors: true
   }
  }
};
