#!/usr/bin/env node

var airpaste = require('./')

var name = 'airpaste-' + (process.argv[2] || 'global')
var stream = airpaste(name)

process.stdin.pipe(stream).pipe(process.stdout)
process.stdin.unref()
