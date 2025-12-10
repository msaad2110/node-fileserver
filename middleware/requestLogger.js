const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const ip = req.ip || req.connection.remoteAddress;

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const method = req.method;
    const url = req.originalUrl || req.url;

    logger.request(`${method} ${url} ${statusCode} ${duration}ms IP: ${ip}`);
  });

  next();
};

module.exports = requestLogger;
