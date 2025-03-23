"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonConfig = void 0;
const winston = require("winston");
const logger_utils_1 = require("../utils/logger.utils");
const path = require("path");
const logDir = (0, logger_utils_1.ensureLogDirectory)();
const isProduction = process.env.NODE_ENV === 'production';
exports.winstonConfig = {
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.simple()),
            level: isProduction ? 'info' : 'debug',
        }),
    ],
};
//# sourceMappingURL=winston.config.js.map