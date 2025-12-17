const winston = require("winston");
require("winston-daily-rotate-file");

const colors = {
  REQUEST: "\x1b[36m",
  ERROR: "\x1b[31m",
  WARN: "\x1b[33m",
  INFO: "\x1b[32m",
  SECURITY: "\x1b[35m",
  ATTACK: "\x1b[91m",
  UPLOAD: "\x1b[34m",
  SERVER: "\x1b[93m",
  CRON: "\x1b[96m",
  WS: "\x1b[95m",
  RESET: "\x1b[0m",
};

const customFormat = winston.format.printf(({ level, message, timestamp, type }) => {
  const logType = type || "INFO";
  const color = colors[logType] || colors.INFO;
  const paddedType = `[${logType}]`.padEnd(12);
  return `${color}${paddedType}${colors.RESET} ${timestamp} ${message}`;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/activity-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "4d",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
});

const logger = winston.createLogger({
  level: "info",
  transports: [
    fileRotateTransport,
    // new winston.transports.Console({
    //   format: winston.format.combine(
    //     winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    //     customFormat
    //   ),
    // }),
  ],
});

const log = (message, options = {}) => {
  logger.info(message, { type: options.type || "INFO" });
};

module.exports = {
  request: (message) => log(message, { type: "REQUEST" }),
  error: (message) => log(message, { type: "ERROR" }),
  warn: (message) => log(message, { type: "WARN" }),
  info: (message) => log(message, { type: "INFO" }),
  security: (message) => log(message, { type: "SECURITY" }),
  attack: (message) => log(message, { type: "ATTACK" }),
  upload: (message) => log(message, { type: "UPLOAD" }),
  server: (message) => log(message, { type: "SERVER" }),
  cron: (message) => log(message, { type: "CRON" }),
  ws: (message) => log(message, { type: "WS" }),
  log,
};
