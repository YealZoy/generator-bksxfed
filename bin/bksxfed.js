#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var path = require('path');
var file = path.resolve(__dirname,'../package.json');
var result = JSON.parse(fs.readFileSync( file));

program
  .version(result.version)
  .description('北控三兴web前端')
  .parse(process.argv);