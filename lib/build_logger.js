const mapValues = require("lodash.mapvalues");

const buildLogFn = require("./build_log_fn");

/**
 * @function LogFn
 * @param options
 * @param {string} [options.msg]
 * @param {Object} [options.info]
 * @param {Error} [options.error]
 */

/**
 * @typedef {Object.<string, LogFn>} Logger
 * @property {LogFn} fatal
 * @property {LogFn} error
 * @property {LogFn} warn
 * @property {LogFn} info
 * @property {LogFn} debug
 * @property {LogFn} verbose
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
