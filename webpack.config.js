const path = require("path")
const webpack = require("webpack")
const UnminifiedWebpackPlugin = require("unminified-webpack-plugin")

/**
 * @returns {webpack.Configuration}
 */
module.exports = function (env) {
    return {
        mode: "production",
        stats: "minimal",
        entry: path.resolve(__dirname, "src", "index.ts"),
        experiments: {
            outputModule: env.esm
        },
        output: {
            path: path.resolve(__dirname, "dist", env.esm ? "esm" : "cjs"),
            filename: "bundle.min.js",
            library: {
                type: env.esm ? "module" : "umd",
                name: env.esm ? undefined : {
                    root: "stringify"
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new UnminifiedWebpackPlugin()
        ]
    }
}
