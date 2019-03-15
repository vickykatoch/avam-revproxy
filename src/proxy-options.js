const logger = require('./logger/logger')(__filename);

const resolveTargetAddress = (route) => (path, req) => {
    const resolvedUrl = route.keepRoutePrefix ?
        path : path.replace(route.route, '');
    return resolvedUrl;
};
const onRequestReceived = (proxyReq, req, res) => {
    logger.info('Request Received');
};
const onResponse = (proxyRes, req, res) => {
    proxyRes.headers['x-interceptor'] = `BK-${process.pid}`;
    logger.info('Response sent');
};
const websocketRequestFactory = (route) => {
    return (proxyRes, req, res) => {
        logger.info(`Socket Request ${route.route}`);
    };
}
const logProvider = () => {
    // const logger = new (require('winston')).Logger();
    return {
        log: logger.log, 
        debug: logger.debug,
        info: logger.info,
        warn: logger.warn,
        error: logger.error
    };
};

const proxyOptions = (route) => {
    return {
        target: route.address,
        ws: route.allowWs,
        pathRewrite: resolveTargetAddress(route),
        onProxyReq: onRequestReceived,
        onProxyRes: onResponse,
        onProxyReqWs: websocketRequestFactory(route),
        logLevel: route.logLevel
        // logProvider: logProvider()
    };
};


module.exports = proxyOptions;