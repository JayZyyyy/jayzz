const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')
// callback => promisify(函数) 将函数返回转化成Promise 防止回调地域 => Promise => async await 异步变同步
const createProjectAction = async project => {
  console.log('jayzz helps you create your project~')
  // 1. clone项目
  // vueRepo 仓库地址 project 输入进来的参数 clone 是否克隆代码
  await download(vueRepo, project, { clone: true })

  // 2. 执行 npm install
  // cwd current working
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3. 运行 npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 4. 打开浏览器
  open('http://localhost:8080/')
}

const addComponentAction = async (name, dest) => {
  // 1. 编译ejs 模板 result
  const result = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() })

  // 2. 写入文件的操作 参数一 路径 参数二 内容
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1. 编译ejs 模板 result
  const pageResult = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() })
  const routerResult = await compile('vue-router.ejs', { name, lowerName: name.toLowerCase() })
  // 2. 写入文件的操作 参数一 路径 参数二 内容
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const routerPagePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(routerPagePath, routerResult)
  }
}

const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`)
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath, storeResult)
    writeToFile(targetRoutePath, typesResult)
  }
}
module.exports = { createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction }
