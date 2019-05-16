const stringify = require("fast-safe-stringify");

function formatJson(json) {
  return stringify(json, null, 2);
}

module.exports = formatJson;
