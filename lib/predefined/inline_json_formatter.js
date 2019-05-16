const stringify = require("fast-safe-stringify");

function formatJson(json) {
  return stringify(json);
}

module.exports = formatJson;
