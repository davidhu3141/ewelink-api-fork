const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  // Determine the devtool setting based on the mode
  const isProduction = argv.mode === 'production';

  return {
    experiments: {
      topLevelAwait: true
    },
    target: 'web',
    entry: './main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
      library: {
        name: 'requireEwelink',
        type: 'umd'
      },
    },
    externals: [nodeExternals({
      allowlist: [/.*/]  // Optionally include specific modules
    })],
    devtool: isProduction ? false : 'eval-source-map', // Conditionally set devtool
    module: {
      rules: [
        {
          test: /\.js$/, 
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };
};
