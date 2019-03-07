const {
    createLogger,
    format,
    transports
} = require('winston');
const path = require('path');
const fs = require('fs');
const logDir = path.join(__dirname, '../../logs');
const config = require('../config');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFileName = path.join(logDir, config.logfileName);


const options = {
    file: {
        level: config.logLevel,
        filename: logFileName,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: config.logLevel,
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const messageFormatter = caller => format.combine(
    format.label({
        label: path.basename(caller)
    }),
    format.colorize(),
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => {
        const message = JSON.stringify(info.message);
        return `${info.timestamp} ${info.level} [${info.label}]: ${message}`;
    })
);

// instantiate a new Winston Logger with the settings defined above
const logger = (caller) => createLogger({
    format: messageFormatter(caller),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.file)
    ]
});


module.exports = logger;