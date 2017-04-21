var path = require('path');
var webpack = require('webpack');

var HTMLWebackPlugin = require('html-webpack-plugin');
var HTMLWebackPluginConfig = new HTMLWebackPlugin({
template: __dirname + '/reactApp/index.html',
filename: 'index.html',
inject: 'body'
});

module.exports = {
entry: './reactApp/app.js',
output: {
path: path.resolve(__dirname, 'build'),
filename: 'app.bundle.js',
publicPath: '/'
},
module: {
loaders: [
{
test: /\.js$/,
loader: 'babel-loader',
query: {
presets: ['es2015', 'react']
}
},
{
test: /\.css$/,
loader: ['style-loader', 'css-loader']
}
]
},
stats: {
colors: true
},
devtool: 'source-map',
plugins: [HTMLWebackPluginConfig]
};
