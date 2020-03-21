const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    admin:  './src/scss/wp-admin.scss',
    editor: './src/scss/wp-editor.scss',
    theme: ['./src/js/theme.js', './src/scss/theme.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)?$/,
        loader: 'url-loader',
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].min.css' }),
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {
      'TweenMax': 'gsap/dist/gsap.min.js',
      'TimelineMax': 'gsap/dist/gsap.min.js',
      'ScrollMagic': 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      'animation.gsap': 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
      'debug.addIndicators': 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
    }
  }
};
