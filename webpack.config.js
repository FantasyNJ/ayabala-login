module.exports = {
    entry: './src/main.js',
    output: {
        path: './src',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 8888
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}