'use strict';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/javascripts/bundles');
const LIB_DIR = path.resolve(__dirname, 'lib');
const CRYPTO_BROWSERIFY = require.resolve('crypto-browserify');
const STREAM_BROWSERIFY = require.resolve('stream-browserify');
const REACT_DIR = path.resolve(__dirname, 'react');
const REDUX_DIR = path.resolve(__dirname, 'redux');
const ENVIRONMENT = process.env.NODE_ENV || 'production';

const productionPlugins = [];

const baseConfig = {
  devtool: ENVIRONMENT !== 'production' ? 'inline-source-map' : false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  mode: ENVIRONMENT !== 'production' ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      crypto: CRYPTO_BROWSERIFY,
      stream: STREAM_BROWSERIFY
    },
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
      'react-redux': path.resolve('./node_modules/react-redux'),
      moment: path.resolve('./node_modules/moment')
    }
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          LIB_DIR,
          REACT_DIR,
          REDUX_DIR
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: productionPlugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: ENVIRONMENT,
      DEBUG: ENVIRONMENT !== 'production'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ])
};

if (ENVIRONMENT === 'production') {
  baseConfig.optimization = {
    // moduleIds: ['hashed'],
    ...(baseConfig.optimization)
  };
}

const globalConfig = {
  ...baseConfig,
  entry: {
    'babel-polyfill': '@babel/polyfill',
    admin: REACT_DIR + '/admin/index.jsx',
    signup: REACT_DIR + '/signup/index.jsx',
    advancedConfiguration: REACT_DIR + '/advancedConfiguration/index.jsx',
    translation: REACT_DIR + '/translation/index.jsx',
    user: REACT_DIR + '/user/index.jsx',
    profile: REACT_DIR + '/profile/index.jsx',
    resources: REACT_DIR + '/resources/index.jsx',
    statistics: REACT_DIR + '/statistics/index.jsx',
    feedback: REACT_DIR + '/feedback/index.jsx',
    resetPassword: REACT_DIR + '/resetPassword/index.jsx',
    information: REACT_DIR + '/information/index.jsx',
    notification: REACT_DIR + '/notification/index.jsx',
    signin: REACT_DIR + '/signin/index.jsx',
    sessionManagement: REACT_DIR + '/sessionManagement/index.jsx',
    notificationPopover: REACT_DIR + '/notificationPopover/index.jsx',
    domainsPopover: REACT_DIR + '/domainsPopover/index.jsx',
    deviceAuthentication: REACT_DIR + '/deviceAuthentication/index.jsx',
    labs: REACT_DIR + '/app/index.jsx'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common',
          filename: 'common.bundle.js'
        }
      }
    },
    // splitChunks: {
    //   chunks: 'all',
    // },
    ...(baseConfig.optimization)
  }
};


const translateBoxConfig = {
  ...baseConfig,
  entry: {
    'babel-polyfill-translateBox': '@babel/polyfill',
    translateBox: REACT_DIR + '/translateBox/index.jsx',
    sessionManagementTranslateBox: REACT_DIR + '/sessionManagement/index.jsx'
  }
};

module.exports = [globalConfig, translateBoxConfig];
