#!/usr/bin/env node

Promise.resolve().then(async () => {
  const Cli = require('commander')
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
    const fileName = Path.basename(FilePath).replace('.md', '')

    const getHtml = (FilePath, distPath) => {
      const md = Fs.readFileSync(FilePath).toString()
      const htmlPath = Path.join(distPath, 'index.html')
      let html = Fs.readFileSync(htmlPath).toString()

      html = html.replace(
        /<title>[\w\W]*?<\/title>/,
        `<title>${fileName}</title>`
      )

      return html.replace('window.MD;', `window.MD = \`${md}\``)
    }

    if (Type === 'demo') {
      Demo(() => {
        return getHtml(FilePath, distPath)
      })
      return
    }

    Fs.writeFileSync(
      Path.join(Path.join(distPath, '../'), `${fileName}.html`),
      getHtml(FilePath, distPath)
    )

    return
  }

  if (Type === 'demo') {
    Demo()
  }
})
