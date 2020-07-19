#!/usr/bin/env node

Promise.resolve().then(async () => {
  const Cli = require('commander')
  const Compressing = require('compressing')
  const CopyDir = require('copy-dir')
  const Fs = require('fs')
  const Path = require('path')
  const Demo = require('./demo')

  Cli.version('0.0.1')
    .description('fe-ppt')
    .option('-t, --type [type]', '执行的命令类型，示例：demo,export')
    .option('-path, --path [type]', '文件路径，绝对路径')
    .parse(process.argv)

  const Type = Cli.type || 'demo'
  const FilePath = Cli.path

  if (Type === 'export' && !FilePath) {
    console.log('必须指定md文件路径')
    process.exit()
  }

  if (FilePath) {
    const distPath = Path.join(__dirname, '../dist')

    const getHtml = (FilePath, distPath) => {
      const md = Fs.readFileSync(FilePath).toString()
      const htmlPath = Path.join(distPath, 'index.html')
      let html = Fs.readFileSync(htmlPath).toString()

      return html.replace('window.MD', `window.MD = \`${md}\``)
    }

    if (Type === 'demo') {
      Demo(() => {
        return getHtml(FilePath, distPath)
      })
      return
    }

    const demoOutPath = Path.join(distPath, '../fe-ppt-demo')

    CopyDir.sync(distPath, demoOutPath)

    Fs.writeFileSync(Path.join(demoOutPath, 'index.html'), getHtml(FilePath, distPath))

    Compressing.zip.compressDir(
      demoOutPath,
      Path.resolve('.', 'fe-ppt-demo.zip')
    )

    return
  }

  if (Type === 'demo') {
    Demo()
  }
})
