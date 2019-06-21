/**
 * @typedef {function(...[*])} LogFn
 */

/**
 * @return {LogFn}
 */
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

    // support lazy args feature
    if (args.length === 1 && typeof args[0] === "function") {
      args = args[0]();
      if (!Array.isArray(args)) {
        throw new TypeError("Lazy args must be an array.");
      }
    }

    args = classifyArgs(args);
    args = normalizeArgs(args);
    let { msg, err, det, etc } = args;

    if (err !== undefined) {
      err = formatError(err);
    }

    if (etc !== undefined) {
      etc = etc.map(x => (isError(x) || isErrorLike(x) ? formatError(x) : x));
    }

    const outputObject = {
      level,
      ts,
      tss,
      msg,
      err,
      det,
      etc
    };

    const outputString = formatJson(outputObject);

    print(outputString);
  };
}

module.exports = buildLogFn;

function classifyArgs(args) {
  let msg = undefined;
  let err = undefined;
  let det = undefined;
  const etc = [];

  args.forEach(arg => {
    if (msg === undefined && isString(arg)) {
      msg = arg;
    } else if (err === undefined && (isError(arg) || isErrorLike(arg))) {
      err = arg;
    } else if (det === undefined && isObject(arg)) {
      det = arg;
    } else {
      etc.push(arg);
    }
  });

  return { msg, err, det, etc };
}

function isString(x) {
  return typeof x === "string";
}

function isError(x) {
  return x instanceof Error;
}

function isObject(x) {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isErrorLike(x) {
  return (
    isObject(x) && isString(x.name) && isString(x.message) && isString(x.stack)
  );
}

function normalizeArgs({ msg, err, det, etc }) {
  return {
    msg: msg == null || msg === "" ? undefined : String(msg),
    err: err == null ? undefined : err,
    det: det == null ? undefined : det,
    etc: etc == null || etc.length === 0 ? undefined : etc
  };
}
