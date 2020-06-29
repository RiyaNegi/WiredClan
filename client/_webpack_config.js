// const webpack = require('webpack');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// test
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'index_bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader"
//           }
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//           },
//         ],
//       },
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin(),
//     new BundleAnalyzerPlugin()
//     // new webpack.DefinePlugin({ // <-- key to reducing React's size
//     //   'process.env': {
//     //     'NODE_ENV': JSON.stringify('production')
//     //   }
//     // }),
//     // // new webpack.optimize.DedupePlugin(), //dedupe similar code 
//     // new webpack.optimize.UglifyJsPlugin(), //minify everything
//     // new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
//   ]

// };


// // "@babel/core": "^7.10.3",
// // "@babel/preset-env": "^7.10.3",
// // "@babel/preset-react": "^7.10.1",
// // "devDependencies": {
// //   "webpack-bundle-analyzer": "^3.8.0",
// //   "uglifyjs-webpack-plugin": "^2.2.0",
// //   "html-webpack-plugin": "^4.3.0",
// //   "css-loader": "^3.6.0",
// //   "babel-loader": "^8.1.0",
// //   "file-loader": "^6.0.0",
// //   "html-loader": "^1.1.0"
// // }
