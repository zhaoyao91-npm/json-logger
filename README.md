# JSON Logger

Opinionated, easy to use, simple JSON logger.

## Install

```bash
npm install @zhaoyao91/json-logger
```

## Usage

```js
const logger = require("@zhaoyao91/json-logger");

logger.$level();

logger.$level(err);
logger.$level(msg);
logger.$level(det);

logger.$level(err, msg);
logger.$level(err, det);
logger.$level(msg, det);

logger.$level(err, msg, det);
```

> Note: numbers and order of args do matter

## Arg order

`err` -> `msg` -> `det`

## Arg Types

- err: `Error` or `Object` with string fields `name`, `message` and `stack`
- msg: `string`
- det: plain `Object` is **recommended**, though other types are acceptable

## Levels

- verbose
- debug
- info
- warn
- error

## Envs

#### LOG_LEVELS

Set which levels should be printed

- Default: `info,warn,error`

#### LOG_PRETTY

Set weather the log is printed inline or pretty

- Default: `false` // which means inline

#### LOG_TS

Set how `ts` (timestamp) field will be printed

- Default: `string`
- Allowed:
  - `string` // print the ts as local ISO 8601 string, e.g `2019-09-09T03:31:50.027+08:00`
  - `number` // print the ts as js timestamp number, e.g `1567971159492`
  - `false` // do not print ts

## License

MIT
