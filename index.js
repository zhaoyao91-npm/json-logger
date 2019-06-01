const buildLogger = require("./lib/build_logger");
const buildOptionsByEnvs = require("./lib/build_options_by_envs");

const defaultOptions = require("./lib/predefined/default_options");
const defaultTsFormatter = require("./lib/predefined/default_ts_formatter");
const defaultErrorFormatter = require("./lib/predefined/default_error_formatter");
const inlineJsonFormatter = require("./lib/predefined/inline_json_formatter");
const prettyJsonFormatter = require("./lib/predefined/pretty_json_formatter");
const stderrPrint = require("./lib/predefined/stderr_print");
const stdoutPrint = require("./lib/predefined/stdout_print");

const logger = buildLogger(buildOptionsByEnvs());

module.exports = {
  logger,

  buildLogger,
  buildOptionsByEnvs,

  defaultOptions,
  defaultTsFormatter,
  defaultErrorFormatter,
  inlineJsonFormatter,
  prettyJsonFormatter,
  stderrPrint,
  stdoutPrint
};
