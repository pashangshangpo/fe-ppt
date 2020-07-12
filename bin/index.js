#!/usr/bin/env node

Promise.resolve().then(async () => {
  const Cli = require('commander')
  const Compressing = require('compressing')
  const CopyDir = require('copy-dir')
  const Fs = require('fs')
  const Path = require('path')
  const Demo = require('./demo')

  Cli.version('0.0.1')
    .description('i-ppt')
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
    const md = Fs.readFileSync(FilePath).toString()
    const distPath = Path.join(__dirname, '../dist')
    const htmlPath = Path.join(distPath, 'index.html')
    let html = Fs.readFileSync(htmlPath).toString()

    html = html.replace('window.MD', `window.MD = \`${md}\``)

    if (Type === 'demo') {
      Demo(html)
      return
    }

    const demoOutPath = Path.join(distPath, '../i-ppt-demo')

    CopyDir.sync(distPath, demoOutPath)

    Fs.writeFileSync(Path.join(demoOutPath, 'index.html'), html)

    Compressing.zip.compressDir(
      demoOutPath,
      Path.resolve('.', 'i-ppt-demo.zip')
    )

    return
  }

  if (Type === 'demo') {
    Demo()
  }
})
