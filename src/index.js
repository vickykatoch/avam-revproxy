const cluster = require('cluster');
const cpus = require('os').cpus().length;

if(cluster.isMaster) {
    const logger = require('./logger/logger')(__filename);
    cluster.on('online', (worker) => {
        logger.info('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', (worker, code, signal) => {
        logger.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        logger.info('Starting a new worker');
        cluster.fork();
    });
    for(let i=0;i<cpus;i++) {
        cluster.fork();
    }
} else {
    require('./server');
}
