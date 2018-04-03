var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        sourceMapFilename: "bundle.map"
    },
    devServer:{
        inline: true,
        port:3000
    },
    devtool: "#source-map",
    module:{
        rules: [
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: /node_moduels/

            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [autoprefixer]
                    }
                }]
            }
        ]
    }

};