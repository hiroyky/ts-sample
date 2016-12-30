var path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: './bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        root:[path.join(__dirname,'node_modules')],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};