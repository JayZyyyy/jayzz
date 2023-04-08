#!/usr/bin/env node
// shebang 也称为 hashbang
const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')
// 查看版本号
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()
createCommands()

program.parse(process.argv)

// console.log(program._optionValues.dest)
