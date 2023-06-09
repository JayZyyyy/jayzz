const program = require('commander')
const { createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction } = require('./actions')

const createCommands = () => {
  program.command('create <project> [others...]').description('clone a repository into a folder').action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: why addcpn HelloWorld [-d src/components]')
    .action(name => {
      addComponentAction(name, program._optionValues.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: jayzz addpage Home [-d src/pages]')
    .action(page => {
      addPageAndRouteAction(page, program._optionValues.dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vue page and router config, 例如: jayzz addstore Home [-d src/pages]')
    .action(store => {
      addStoreAction(store, program._optionValues.dest || 'src/store/modules')
    })
}

module.exports = createCommands
