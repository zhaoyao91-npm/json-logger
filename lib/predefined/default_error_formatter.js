const trim = require("lodash.trim");

function formatError(error) {
  if (typeof error === "object" && error != null && !Array.isArray(error)) {
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
  } else {
    return error;
  }
}

module.exports = formatError;
