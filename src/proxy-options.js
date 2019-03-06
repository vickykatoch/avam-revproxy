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
    proxyRes.headers['x-poweredby'] = 'BK'; 
    log('Response sent');
};
const onWebSocketRequest = (proxyRes, req, res) => {
    log('Websocket request');
};

const proxyOptions = (route, listenWebSocket)=> {
    return {
        target: route.address,
        ws: listenWebSocket,
        pathRewrite: resolveTargetAddress(route),
        onProxyReq: onRequestReceived,
        onProxyRes: onResponse,
        onProxyReqWs: onWebSocketRequest
    };
};


module.exports = proxyOptions;