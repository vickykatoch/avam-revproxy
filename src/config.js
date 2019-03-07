module.exports = {
    port: 3000,
    logLevel: 'debug',
    logfileName: 'application.log',
    routes: [{
        route: '/app1',
        address: 'http://localhost:3001',
        allowWs: false
    }, {
        route: '/app2',
        address: 'http://localhost:4200',
        allowWs: true
    }]
};