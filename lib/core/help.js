const program = require('commander')

const helpOptions = () => {
  // 增加自己的options --help中的描述
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d /src/components')
  program.option('-f --framework <framework>', ' your framework')

  // 监听 --help
  program.on('--help', function () {
    console.log('')
    console.log('Other:')
    console.log(' other options~')
  })
}

module.exports = helpOptions
