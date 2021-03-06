const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.join(__dirname, '/www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Mobile Sandbox',
      template: './src/index.pug'
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'vue-router$': 'vue-router/dist/vue-router.min.js'
    }
  },
  devServer: {
    inline: true
  }
}