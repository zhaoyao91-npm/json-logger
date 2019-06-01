const buildLogFn = require("./build_log_fn");

/**
 * @typedef {Object.<string, LogFn>} Logger
 */

/**
 * @param loggerOptions
 * @param baseOptions
 * @returns {Logger}
 */
function buildLogger({ loggerOptions, baseOptions }) {
  return mapValues(loggerOptions, logOptions =>
    buildLogFn({
      ...baseOptions,
      ...logOptions
    })
  );
}

module.exports = buildLogger;

function mapValues(obj, fn) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[key] = fn(obj[key], key);
  });
  return ret;
}
