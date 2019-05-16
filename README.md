# Logger

Simple JSON logger.

## Install

```bash
npm install @bucuo/logger
```

## Usage

```js
const { logger } = require("@bucuo/logger");

// you can pass in msg, info and error in any order
logger.$level(msg, info, error);
```

## Types

- `msg`: string
- `info`: plain object
- `error`: `Error` like object (with proper `name` and `message` fields)

## Default Levels

- 60: `fatal`
- 50: `error`
- 40: `warn`
- 30: `info`
- 20: `debug`
- 10: `verbose`

## Default Options

see [Default Options](./lib/predefined/default_options.js#L8)

## Env Options

- `LOG_PRINT_LEVEL`: number
- `LOG_PRINT_PRETTY`: boolean
- `LOG_ENABLE_TS`: boolean
- `LOG_ENABLE_TSS`: boolean

## Advanced

If you are not satisfied with the default logger and env options, you could build logger with pre-defined or customized
bricks.

See

- [buildLogger](./lib/build_logger.js)
- [defaultOptions](./lib/predefined/default_options.js#L8)
- [pre-defined bricks](./lib/predefined)

## License

MIT
