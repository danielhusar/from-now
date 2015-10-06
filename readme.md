# from-now [![Build Status](https://travis-ci.org/danielhusar/from-now.svg?branch=master)](https://travis-ci.org/danielhusar/from-now)

> Get relative time (ago) like 5 seconds, 12 hours, 3 months...


## Install

```
$ npm install --save from-now
```


## Usage

```js
var fromNow = require('from-now');

fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)');
fromNow(1444140297141);
fromNow(new Date());
```


## API

### fromNow(input, translations)

#### input

Type: `string`, `number` or `date object`

Time in past

#### translations

##### foo

Type: `object` 
Default: `{}`

Custom translations that can be used for units.

### Example

```js
var fromNow = require('from-now');
var opts = {'seconds': {
	1: 'sekunda',
	2: 'sekundy',
	5: 'sekund'
}};

fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)', opts);
```

It will match the nearest key that is smaller than interval.
```
1 second = 1 sekunda
2 seconds = 2 sekundy
3 seconds = 3 sekundy
4 seconds = 4 sekundy
5 seconds = 5 sekund
```

You can also use shorthand that will be used for all intervals. 
```js
var fromNow = require('from-now');
var opts = {'seconds': 's'};

fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)', opts); // 15 s
```

Check the tests for more details.

## License

MIT © [Daniel Husar](https://github.com/danielhusar)
