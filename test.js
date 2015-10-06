'use strict';
var assert = require('assert');
var sinon = require('sinon');
var fromNow = require('./');
var clock;

afterEach(function () {
	clock.restore();
});

it('Now', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)'), 'now');
});

it('Seconds', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)'), '1 second');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:30 GMT+0100 (IST)'), '20 seconds');
	assert.equal(fromNow('Tue Sep 14 2015 14:31:51 GMT+0100 (IST)'), '59 seconds');
});

it('Minutes', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 14:31:50 GMT+0100 (IST)'), '1 minute');
	assert.equal(fromNow('Tue Sep 14 2015 14:30:50 GMT+0100 (IST)'), '2 minutes');
	assert.equal(fromNow('Tue Sep 14 2015 13:33:50 GMT+0100 (IST)'), '59 minutes');
});

it('Hours', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 13:32:50 GMT+0100 (IST)'), '1 hour');
	assert.equal(fromNow('Tue Sep 14 2015 12:32:50 GMT+0100 (IST)'), '2 hours');
});

it('Days', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 13 2015 14:32:50 GMT+0100 (IST)'), '1 day');
	assert.equal(fromNow('Tue Sep 12 2015 14:32:50 GMT+0100 (IST)'), '2 days');
});

it('Weeks', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 7 2015 14:32:50 GMT+0100 (IST)'), '1 week');
	assert.equal(fromNow('Tue Aug 27 2015 14:32:50 GMT+0100 (IST)'), '2 weeks');
});

it('Years', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2014 14:32:50 GMT+0100 (IST)'), '1 year');
	assert.equal(fromNow('Tue Sep 14 2013 14:32:50 GMT+0100 (IST)'), '2 years');
});

it('Short options', function () {
	var opts = {'seconds': 's'};
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)', opts), '1 s');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:30 GMT+0100 (IST)', opts), '20 s');
	assert.equal(fromNow('Tue Sep 14 2015 14:31:51 GMT+0100 (IST)', opts), '59 s');
});

it('Translations', function () {
	var opts = {'seconds': {
		1: 'sekunda',
		2: 'sekundy',
		5: 'sekund'
	}};
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow('Tue Sep 14 2015 14:32:49 GMT+0100 (IST)', opts), '1 sekunda');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:48 GMT+0100 (IST)', opts), '2 sekundy');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:47 GMT+0100 (IST)', opts), '3 sekundy');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:46 GMT+0100 (IST)', opts), '4 sekundy');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:45 GMT+0100 (IST)', opts), '5 sekund');
	assert.equal(fromNow('Tue Sep 14 2015 14:32:44 GMT+0100 (IST)', opts), '6 sekund');
});

it('Input formats', function () {
	clock = sinon.useFakeTimers(new Date('Tue Sep 14 2015 14:32:50 GMT+0100 (IST)').getTime());
	assert.equal(fromNow(new Date('Tue Sep 14 2015 14:32:30 GMT+0100 (IST)')), '20 seconds');
	assert.equal(fromNow(1442237550000), '20 seconds');
});

it('Error handling', function () {
	assert.throws(function () {
		fromNow();
	});

	assert.throws(function () {
		fromNow('foo');
	});
});
