import winston from 'winston';
import options from '../config/commander.config.js';

import fs from 'fs';
import path from 'path';

const logDir = path.resolve('logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

const transports = [];
if(options.mode === 'dev'){
    transports.push(
        new winston.transports.Console({
            level:'info'
        })
    )
}else if (options.mode === 'prod'){
    transports.push(
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        })
    );
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    format: winston.format.combine(
        winston.format.colorize({
            colors: customLevelOptions.colors
        }),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf(({level, message}) => {
            return `[${level}]: ${message}`;
        })
    ),
    transports
})

export default logger;