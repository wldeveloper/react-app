var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:'./src/app.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'static/js/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                include:path.resolve(__dirname,'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react'],
                        plugins: [
                           ["import", { libraryName: "antd", style: "css" }] 
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:[
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test:/\.scss$/,
                use:ExtractTextPlugin.extract({
                    use:[
                        'css-loader?importLoaders=1',
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test:/\.html$/,
                use:'html-loader'
            },
             {
                test:/\.ejs$/,
                use:'ejs-loader'
            },
            {
                test:/\.(png|jpg|gif|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        query:{
                            limit:10240,
                            name:'assets/[name]-[hash:5].[ext]'
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        query:{
                            progressive: true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
            inject:'body'
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, 'static'),
            to: 'static',
            ignore: ['.*']
          }
        ]),
        new ExtractTextPlugin('static/css/app.css')
    ]
}