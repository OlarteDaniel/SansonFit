import winston from 'winston';

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
    transports: [
        new winston.transports.Console({level:'info'})
    ]
})

export default logger;