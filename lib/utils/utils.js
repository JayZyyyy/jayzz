const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  // 参数是路径

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const createDirSync = pathName => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在，如果不存在，创建对应文件夹
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}
