var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');

var isProduction = process.argv.indexOf('-p') > 0;

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
    extensions: ['.js', '.ts', '.tsx'],
    // Replace react with preact for performance and size
    alias: {
      // FIXME: temporal workaround for preact-compat issues
      // https://github.com/developit/preact-compat/issues/192#issuecomment-262187972
      'react': isProduction ? 'preact-compat/dist/preact-compat' : 'preact-compat',
      'react-dom': isProduction ? 'preact-compat/dist/preact-compat' : 'preact-compat'
    },
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        loader: [
          'react-hot-loader',
          'awesome-typescript-loader'
        ],
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
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devServer: {
    contentBase: './src',
    hot: true,
    stats: {
      warnings: false
    }
  },
};