const logger = require("../utils/logger");

const sqlInjectionPatterns = [
  /(\bSELECT\b.*\bFROM\b)/i,
  /(\bUNION\b.*\bSELECT\b)/i,
  /(\bOR\b\s+\d+\s*=\s*\d+)/i,
  /(\bDROP\b\s+\bTABLE\b)/i,
  /(--)/,
  /(\/\*.*\*\/)/,
  /(\bEXEC\b|\bEXECUTE\b)/i,
  /(\bINSERT\b.*\bINTO\b)/i,
  /(\bUPDATE\b.*\bSET\b)/i,
  /(\bDELETE\b.*\bFROM\b)/i,
];

const xssPatterns = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
];

const checkForSQLInjection = (value) => {
  if (typeof value !== "string") return false;
  return sqlInjectionPatterns.some((pattern) => pattern.test(value));
};

const checkForXSS = (value) => {
  if (typeof value !== "string") return false;
  return xssPatterns.some((pattern) => pattern.test(value));
};

const scanObject = (obj) => {
  const threats = [];

  const scan = (data, path = "") => {
    if (typeof data === "string") {
      if (checkForSQLInjection(data)) {
        threats.push({ type: "SQL Injection", value: data, path });
      }
      if (checkForXSS(data)) {
        threats.push({ type: "XSS", value: data, path });
      }
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => scan(item, `${path}[${index}]`));
    } else if (typeof data === "object" && data !== null) {
      Object.keys(data).forEach((key) => scan(data[key], path ? `${path}.${key}` : key));
    }
  };

  scan(obj);
  return threats;
};

const securityLogger = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;

  const allData = {
    ...req.body,
    ...req.query,
    ...req.params,
  };

  const threats = scanObject(allData);

  if (threats.length > 0) {
    threats.forEach((threat) => {
      logger.attack(
        `${threat.type} attempt: ${threat.value.substring(0, 100)} from IP: ${ip}`
      );
    });
  }

  next();
};

module.exports = securityLogger;
