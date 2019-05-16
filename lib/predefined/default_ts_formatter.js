const { DateTime } = require("luxon");

function formatTs(ts) {
  return DateTime.fromMillis(ts).toISO();
}

module.exports = formatTs;
