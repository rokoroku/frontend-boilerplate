var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: [
      './index.tsx',
      './index.html'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-hot-api',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        loader: [
          'react-hot-loader',
          'awesome-typescript-loader'
        ]
      },
      // css 
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      // static assets 
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.jpg$/,
        loader: 'file-loader'
      }, {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          rucksack({
            autoprefixer: true
          })
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
  ],
  devServer: {
    contentBase: './src',
    hot: true,
    stats: {
      warnings: false
    }
  },
};