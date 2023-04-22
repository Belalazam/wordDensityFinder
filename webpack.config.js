const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode : "development",
    devtool : "cheap-module-source-map",
    entry : 
    {
        app : path.resolve("./src/routing.js"),
        navigateToTheWord : path.resolve("./pdfSearch/navigateToTheWord.js"),
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    plugins:[
        new CopyPlugin({
            patterns: [
                { from: path.resolve('src/manifest.json'), to: path.resolve('dist') },
                { from: path.resolve('src/app.css'), to: path.resolve('dist') },
            ]
        }),
        new HtmlWebpackPlugin({
            template : './src/app.html',
            filename : 'app.html',
            chunks : ['app']
        })
    ],
    resolve :{
        extensions : ['.js', '.jsx','.css']
    },
    output:
    {
        filename : "[name].js"
    }
} 