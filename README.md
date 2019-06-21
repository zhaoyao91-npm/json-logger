# JSON Logger

Simple JSON logger.

## Install

```bash
npm install @zhaoyao91/json-logger
```

## Usage

```js
const { logger } = require("@zhaoyao91/json-logger");

logger.$level(msg, err, det);
```

Args are classified by types. You can pass in args in any order.

## Arg Types

- msg: `string`
- err: `Error` or `Object` with string fields `name`, `message` and `stack`
- det: plain `Object`

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
- `LOG_ENABLE_TRACE`: boolean - Tracing is expensive, you know.

## Other Features

### Lazy Args

Debug logs are useful, but sometimes it's expensive to compute the args.

By using `lazy args`, the evaluation won't happen if this log won't be printed.

It's easy to use, just replace the args with a function which returns an array of lazy args.

```js
logger.debug(() => [
  "lazy message",
  new Error("lazy error"),
  { lazy: "detail" }
]);
```

## Advanced

If you are not satisfied with the default logger and env options, you could build logger with pre-defined or customized
bricks.

See

- [buildLogger](./lib/build_logger.js)
- [buildOptionsByEnvs](./lib/build_options_by_envs.js)
- [defaultOptions](./lib/predefined/default_options.js#L8)
- [pre-defined bricks](./lib/predefined)

## License

MIT
