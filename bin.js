#!/usr/bin/env node

var airpaste = require('./')
var stream = airpaste(process.argv[2])

process.stdin.pipe(stream).pipe(process.stdout)
process.stdin.unref()
