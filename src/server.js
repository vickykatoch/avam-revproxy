const app = require('express')();
const proxy = require('http-proxy-middleware');
const config = require('./config');
const getProxyOptions = require('./proxy-options');
debugger;


const buildProxy = (route) => {
    return proxy(getProxyOptions(route,true));
};


config.routes.forEach(route => {
    app.use(route.route, buildProxy(route));
    console.log(route);
});
app.listen(config.port, () => {
    console.log(`Reverse Proxy Server listening on port : ${config.port}, Process: ${process.pid}`);
});