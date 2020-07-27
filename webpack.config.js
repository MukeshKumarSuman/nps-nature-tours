const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Image in template html as <img> tags, webpack by default won't pick them up because it doesn't parse HTML.
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}, options) => {
    const isProduction = env.production === true;
    return {
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './dist'),
            publicPath: ''
        },
        mode: isProduction ? 'production' : 'development',
        devServer: {
            open: true
        },
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                     // Creates `style` nodes from JS strings
                     MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS 
                     'css-loader',
                     // Compiles Sass to CSS  
                     'sass-loader'
                     ]
               },
               {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
              },
                
    
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            new CopyPlugin({
                patterns: [
                  { from: './src/images', to: './images' },
                  { from: './src/vendor', to: './' }
                ],
              }),
        ]
    }
}
