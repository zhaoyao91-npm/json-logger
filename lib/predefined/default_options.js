const defaultTsFormatter = require("./default_ts_formatter");
const defaultErrorFormatter = require("./default_error_formatter");
const defaultJsonFormatter = require("./inline_json_formatter");

const stderrPrint = require("./stderr_print");
const stdoutPrint = require("./stdout_print");

const options = {
  baseOptions: {
    formatTs: defaultTsFormatter,
    formatError: defaultErrorFormatter,
    formatJson: defaultJsonFormatter,
    printLevel: 30,
    enableTs: true,
    enableTss: true,
    enableTrace: false
  },
  loggerOptions: {
    fatal: {
      level: 60,
      print: stderrPrint
    },
    error: {
      level: 50,
      print: stderrPrint
    },
    warn: {
      level: 40,
      print: stderrPrint
    },
    info: {
      level: 30,
      print: stdoutPrint
    },
    debug: {
      level: 20,
      print: stdoutPrint
    },
    verbose: {
      level: 10,
      print: stdoutPrint
    }
  }
};

module.exports = options;
