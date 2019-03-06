const log = (message)=> {
    console.log(`[${process.pid}] => ${message}`);
};
const resolveTargetAddress = (route) => (path,req) => {
    return path.replace(route.route,'');
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

const proxyOptions = (route)=> {
    return {
        target: route.address,
        ws: route.allowWs,
        pathRewrite: resolveTargetAddress(route),
        onProxyReq: onRequestReceived,
        onProxyRes: onResponse,
        onProxyReqWs: onWebSocketRequest
    };
};


module.exports = proxyOptions;