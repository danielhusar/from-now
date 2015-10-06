'use strict';

var deepAssign = require('deep-assign');
var defaults = {
	'now': 'now',
	'seconds': {
		1: 'second',
		2: 'seconds'
	},
	'minutes': {
		1: 'minute',
		2: 'minutes'
	},
	'hours': {
		1: 'hour',
		2: 'hours'
	},
	'days': {
		1: 'day',
		2: 'days'
	},
	'weeks': {
		1: 'week',
		2: 'weeks'
	},
	'months': {
		1: 'month',
		2: 'months'
	},
	'years': {
		1: 'year',
		2: 'years'
	}
};

function getUnit(interval, unit, opts) {
	var ret;

	if (typeof opts[unit] === 'string') {
		return opts[unit];
	}

	Object.keys(opts[unit]).forEach(function (key) {
		if (key <= interval) {
			ret = opts[unit][key];
		}
	});

	return ret;
}

module.exports = function (date, opts) {
	var past = (date instanceof Date) ? date : new Date(date);
	var now = new Date();
	opts = deepAssign({}, defaults, opts);

	if (!isFinite(past) || !date) {
		throw new TypeError('Failed to parse the date');
	}

	var seconds = Math.floor((now - past) / 1000);
	var interval = Math.floor(seconds / 31536000);

	if (seconds < 0) {
		throw new TypeError('Please put date in past');
	}

	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'years', opts);
	}

	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'months', opts);
	}

	interval = Math.floor(seconds / (86400 * 7));
	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'weeks', opts);
	}

	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'days', opts);
	}

	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'hours', opts);
	}

	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return interval + ' ' + getUnit(interval, 'minutes', opts);
	}

	interval = Math.floor(seconds);
	if (interval === 0) {
		return opts.now;
	}

	return interval + ' ' + getUnit(interval, 'seconds', opts);
};
