const compose = require("lodash.compose");

const buildLogger = require("./build_logger");
const defaultOptions = require("./predefined/default_options");
const inlineJsonFormatter = require("./predefined/inline_json_formatter");
const prettyJsonFormatter = require("./predefined/pretty_json_formatter");

function buildLoggerByEnvs() {
  const options = compose(
    handlePrintLevel,
    handlePrintPretty,
    handleEnableTs,
    handleEnableTss
  )(defaultOptions);

  return buildLogger(options);
}

module.exports = buildLoggerByEnvs;

function handlePrintLevel({ loggerOptions, baseOptions }) {
  const { LOG_PRINT_LEVEL: value } = process.env;
  if (value == null) {
    return { loggerOptions, baseOptions };
  } else {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        printLevel: Number(value)
      }
    };
  }
}

function handlePrintPretty({ loggerOptions, baseOptions }) {
  const { LOG_PRINT_PRETTY: value } = process.env;
  if (value && value.trim() === "true") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        formatJson: prettyJsonFormatter
      }
    };
  } else if (value && value.trim() === "false") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        formatJson: inlineJsonFormatter
      }
    };
  } else {
    return { loggerOptions, baseOptions };
  }
}

function handleEnableTs({ loggerOptions, baseOptions }) {
  const { LOG_ENABLE_TS: value } = process.env;
  if (value && value.trim() === "true") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTs: true
      }
    };
  } else if (value && value.trim() === "false") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTs: false
      }
    };
  } else {
    return { loggerOptions, baseOptions };
  }
}

function handleEnableTss({ loggerOptions, baseOptions }) {
  const { LOG_ENABLE_TSS: value } = process.env;
  if (value && value.trim() === "true") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTss: true
      }
    };
  } else if (value && value.trim() === "false") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTss: false
      }
    };
  } else {
    return { loggerOptions, baseOptions };
  }
}
