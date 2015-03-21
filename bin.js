#!/usr/bin/env node

var airpaste = require('./')

if (process.argv.indexOf('--help') > -1 || process.argv.indexOf('-h') > -1) {
  console.log('Usage: airpaste [namespace?]')
  process.exit()
}

var stream = airpaste(process.argv[2])

process.stdin.pipe(stream).pipe(process.stdout)
if (process.stdin.unref) process.stdin.unref()
