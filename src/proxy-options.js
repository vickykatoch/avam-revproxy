const log = (message) => {
    console.log(`[${process.pid}] => ${message}`);
};
const resolveTargetAddress = (route) => (path, req) => {
    return path.replace(route.route, '');
};
const onRequestReceived = (proxyReq, req, res) => {
    log('Request Received');
};
const onResponse = (proxyRes, req, res) => {
    proxyRes.headers['x-interceptor'] = `BK-${process.pid}`;
    log('Response sent');
};
const onWebSocketRequest = (proxyRes, req, res) => {
    log('Websocket request');
};
// const logProvider = () => {
//     const logger = new (require('winston')).Logger();
//     return {
//         log: logger.log, 
//         debug: logger.debug,
//         info: logger.info,
//         warn: logger.warn,
//         error: logger.error
//     };
// };

const proxyOptions = (route) => {
    return {
        target: route.address,
        ws: route.allowWs,
        pathRewrite: resolveTargetAddress(route),
        onProxyReq: onRequestReceived,
        onProxyRes: onResponse,
        onProxyReqWs: onWebSocketRequest,
        logLevel: route.logLevel
        // logProvider: logProvider
    };
};


module.exports = proxyOptions;