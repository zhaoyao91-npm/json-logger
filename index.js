const buildLoggerByEnvs = require("./lib/build_logger_by_envs");
const buildLogger = require("./lib/build_logger");

const defaultOptions = require("./lib/predefined/default_options");
const defaultTsFormatter = require("./lib/predefined/default_ts_formatter");
const defaultErrorFormatter = require("./lib/predefined/default_error_formatter");
const inlineJsonFormatter = require("./lib/predefined/inline_json_formatter");
const prettyJsonFormatter = require("./lib/predefined/pretty_json_formatter");
const stderrPrint = require("./lib/predefined/stderr_print");
const stdoutPrint = require("./lib/predefined/stdout_print");

const logger = buildLoggerByEnvs();

module.exports = {
  logger,
  buildLogger,
  predefined: {
    defaultOptions,
    defaultTsFormatter,
    defaultErrorFormatter,
    inlineJsonFormatter,
    prettyJsonFormatter,
    stderrPrint,
    stdoutPrint
  }
};
