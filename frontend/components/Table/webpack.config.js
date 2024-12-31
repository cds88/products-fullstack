const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "Table",
        libraryTarget: "umd"

    },
    module:{
        rules:[
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'swc.config.json')
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx",".js", ".jsx"]
    },
    devServer: {
      
        hot: true,
        port: 3001
    }

}