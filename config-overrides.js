const { useBabelRc, override,overrideDevServer } = require("customize-cra");
const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/api': {
            target: 'https://panel-cstp.vermi-succotash.net',
            changeOrigin: true,
            secure:false
        },
        '/auth': {
            target: 'https://panel-cstp.oasgames.com',
            changeOrigin: true,
            secure:false
        },
    };

    return {
        ...configFunction,
        port: 3001
    }
}

module.exports = {
    webpack: override(
        useBabelRc()
    ),
    devServer: overrideDevServer(
        addProxy()
    )

}
