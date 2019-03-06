const cluster = require('cluster');
const cpus = require('os').cpus().length;

if(cluster.isMaster) {
    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
    for(let i=0;i<cpus;i++) {
        cluster.fork();
    }
} else {
    require('./server');
}
