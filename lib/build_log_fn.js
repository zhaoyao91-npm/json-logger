const _isString = require("lodash.isstring");
const _isError = require("lodash.iserror");
const _isPlainObject = require("lodash.isplainobject");

function buildLogFn({
  level,
  printLevel,
  print,
  formatTs,
  formatError,
  formatJson,
  enableTs,
  enableTss
}) {
  return function logFn(...args) {
    if (level < printLevel) return;

    const now = Date.now();
    const ts = enableTs ? now : undefined;
    const tss = enableTss ? formatTs(now) : undefined;

    let { msg, info, error, etc } = classifyArgs(args);

    error = error !== undefined ? formatError(error) : error;

    etc = etc.map(x => (isError(x) ? formatError(x) : x));
    etc = etc.length !== 0 ? etc : undefined;

    const outputObject = {
      level,
      ts,
      tss,
      msg,
      info,
      error,
      etc
    };

    const outputString = formatJson(outputObject);

    print(outputString);
  };
}

module.exports = buildLogFn;

/**
 * recognize and collect the first encountered msg, info, error
 * and group other args as 'etc'
 */
function classifyArgs(args) {
  let msg, info, error;
  const etc = [];

  args.forEach(arg => {
    if (isMsg(arg) && msg === undefined) {
      msg = arg;
    } else if (isError(arg) && error === undefined) {
      error = arg;
    } else if (isInfo(arg) && info === undefined) {
      info = arg;
    } else {
      etc.push(arg);
    }
  });

  return { msg, info, error, etc };
}

function isMsg(x) {
  return _isString(x);
}

function isInfo(x) {
  return _isPlainObject(x);
}

function isError(x) {
  return _isError(x);
}
