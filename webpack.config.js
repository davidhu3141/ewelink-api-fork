const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  experiments: {
    topLevelAwait: true
  },
//   target: 'node',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',  // Your source code bundle
    library: {
        name: 'requireEwelink', // Name of the global variable when included directly in browsers
        type: 'umd' // Universal Module Definition, works as amd, cjs and as var in browsers
      },
  },
  externals: [nodeExternals({
    allowlist: [/.*/]  // Optionally include specific modules
  })],
  
  devtool: 'eval', // Set the sourcemap type to 'eval'
  
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
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
