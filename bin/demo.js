const Path = require('path')
const fs = require('fs')
const static = require('koa-static')
const Koa = require('koa')
const app = new Koa()

module.exports = getHtml => {
  app.use(async (cxt, next) => {
    if (cxt.url === '/' && getHtml) {
      cxt.body = getHtml()

      return
    }

    await next()
  })

  app.use(static(Path.join(__dirname, '../dist')))

  app.listen(7900, () => {
    console.log('http://127.0.0.1:7900/#/')
  })
}
