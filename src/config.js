module.exports = {
    port: 3000,
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