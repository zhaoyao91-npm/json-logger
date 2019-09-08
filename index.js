const stringify = require("fast-safe-stringify");
const dayjs = require("dayjs");

// the ISO 8601 datetime format with local offset and milliseconds
const dateFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";

const {
  LOG_LEVELS = "info,warn,error",
  LOG_PRETTY = "false",
  LOG_TS = "string"
} = process.env;

const logLevels = LOG_LEVELS.split(",");
const logPretty = LOG_PRETTY === "true";
const logTs = ["string", "number"].includes(LOG_TS) ? LOG_TS : false;

const logger = {
  verbose: buildLogFn("verbose", console.log),
  debug: buildLogFn("debug", console.log),
  info: buildLogFn("info", console.log),
  warn: buildLogFn("warn", console.error),
  error: buildLogFn("error", console.error)
};

module.exports = logger;

function buildLogFn(level, print) {
  if (logLevels.includes(level)) {
    const format = logPretty ? formatPretty : formatInline;
    const buildTs =
      logTs === "string" ? tsString : logTs === "number" ? tsNumber : empty;

    return function log(...args) {
      const { err, msg, det } = parseArgs(args);
      const output = {
        level,
        ts: buildTs(),
        err: formatError(err),
        msg,
        det
      };
      const formatted = format(output);
      print(formatted);
    };
  } else {
    return empty;
  }
}

function empty() {}

function formatPretty(target) {
  return stringify(target, null, 2);
}

function formatInline(target) {
  return stringify(target);
}

function tsString() {
  return dayjs().format(dateFormat);
}

function tsNumber() {
  return new Date().getTime();
}

function formatError(error) {
  if (error == null) return error;
  return {
    ...error,
    name: error.name,
    message: error.message,
    stack:
      typeof error.stack === "string"
        ? error.stack
            .split("\n")
            .slice(1)
            .map(trim)
        : error.stack
  };
}

function parseArgs(args) {
  if (args.length === 0) {
    return {};
  } else if (args.length === 1) {
    if (isErrorLike(args[0])) return { err: args[0] };
    else if (isString(args[0])) return { msg: args[0] };
    else return { det: args[0] };
  } else if (args.length === 2) {
    if (isErrorLike(args[0])) {
      if (isString(args[1])) return { err: args[0], msg: args[1] };
      else return { err: args[0], det: args[1] };
    } else if (isString(args[0])) return { msg: args[0], det: args[1] };
  } else if (args.length === 3) {
    if (isEffectiveError(args[0]) && isString(args[1])) {
      return { err: args[0], msg: args[1], det: args[2] };
    }
  }

  return {
    err: new Error("Invalid log arguments"),
    msg: "invalid log arguments",
    det: args
  };
}

function trim(string) {
  return string.trim();
}

function isObject(x) {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isErrorLike(x) {
  return (
    isObject(x) && isString(x.name) && isString(x.message) && isString(x.stack)
  );
}

function isString(x) {
  return typeof x === "string";
}

function isError(x) {
  return x instanceof Error;
}

function isEffectiveError(x) {
  return isError(x) || isErrorLike(x);
}
