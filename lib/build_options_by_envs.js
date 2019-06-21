const defaultOptions = require("./predefined/default_options");
const inlineJsonFormatter = require("./predefined/inline_json_formatter");
const prettyJsonFormatter = require("./predefined/pretty_json_formatter");

function buildOptionsByEnvs(options = defaultOptions) {
  return handleOptions(options);
}

module.exports = buildOptionsByEnvs;

const handleOptions = compose(
  handlePrintLevel,
  handlePrintPretty,
  handleEnableTs,
  handleEnableTss,
  handleEnableTrace
);

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

function handleEnableTrace({ loggerOptions, baseOptions }) {
  const { LOG_ENABLE_TRACE: value } = process.env;
  if (value && value.trim() === "true") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTrace: true
      }
    };
  } else if (value && value.trim() === "false") {
    return {
      loggerOptions,
      baseOptions: {
        ...baseOptions,
        enableTrace: false
      }
    };
  } else {
    return { loggerOptions, baseOptions };
  }
}

function compose(...funcs) {
  return function(arg) {
    return funcs.reduceRight((result, func) => func(result), arg);
  };
}
