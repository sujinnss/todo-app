const {
    override,
    addBabelPlugin,
    addWebpackAlias,
    fixBabelImports,
} = require('customize-cra');

module.exports = override(
    // addBabelPlugin("react-hot-loader/babel"),
    fixBabelImports('antd', {
        libraryDirectory: 'es',
        style: 'css',
    })
    // addWebpackAlias({
    //     "react-dom":
    //         process.env.NODE_ENV === "production"
    //             ? "react-dom"
    //             : "@hot-loader/react-dom"
    // })
);
