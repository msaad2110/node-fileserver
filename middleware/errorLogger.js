const logger = require("../utils/logger");

const errorLogger = (err, req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const url = req.originalUrl || req.url;

  logger.error(`Error: ${err.message} | URL: ${url} | IP: ${ip}`);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    hasError: true,
  });
};

module.exports = errorLogger;
