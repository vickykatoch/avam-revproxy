const app = require('express')();
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const config = require('./config');
const getProxyOptions = require('./proxy-options');
const logger = require('./logger/logger')(__filename);
const expressLogger = {
    write:  message => logger.info(message)
};

app.use(morgan('combined', { stream : expressLogger}));


const buildProxy = (route) => {
    return proxy(getProxyOptions(route));
};


config.routes.forEach(route => {
    app.use(route.route, buildProxy(route));
    logger.info(route);
});
app.listen(config.port, () => {
    logger.info(`Reverse Proxy Server listening on port : ${config.port}, Process: ${process.pid}`);
});