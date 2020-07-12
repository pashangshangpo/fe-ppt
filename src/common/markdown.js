import marked from '$common/marked'

marked.setOptions({
  xhtml: true,
})

export default md => {
  const warpTagNameList = []
  let pageIndex = 1

  marked.use({
    renderer: {
      heading(text, level) {
        return `<h${level} ${this.token.attrs}>${text}</h${level}>\n`
      },
      warp: ({ text, value }) => {
        if (!text) {
          const tagName = warpTagNameList.pop()

          if (!tagName) {
            return ''
          }

          return `</${tagName}>\n`
        }

        const list = text.split(' ')
        const classNames = []
        let isPage = false
        let style = ''

        for (let li of list) {
          if (li === 'page') {
            classNames.push(`page-${pageIndex}`)
            isPage = true
            pageIndex += 1
          } else if (li === 'style') {
            const styleDom = document.createElement('style')
            styleDom.innerHTML = value

            document.body.appendChild(styleDom)
            return ''
          } else if (li.indexOf('background') === 0) {
            if (li.indexOf('http') > -1) {
              style += `background: url('${li.slice(
                li.indexOf(':') + 1
              )}') no-repeat;background-size: cover;`
            } else {
              style += `background: ${li.slice(li.indexOf(':') + 1)};`
            }
          } else if (li.indexOf('.') === 0) {
            if (li.indexOf('.animate__') === 0) {
              classNames.push('animate__animated')
            }

            classNames.push(li.slice(1))
          }
        }

        const tagName = isPage ? 'section' : 'div'

        warpTagNameList.push(tagName)

        const names = classNames.join(' ')

        return `<
				${tagName}
				${names ? ` className="${names}"` : ''}
				${style ? ` style="${style}"` : ''}
			>\n`
      },
    },
  })

  const configMatch = md.match(/^-{3,} *\n+([\w\W]+?)\n+-{3,}/)

  if (configMatch) {
    md = md.substring(configMatch[0].length)

    configMatch[1].split('\n').forEach(config => {
      const [name, value] = config.split(':')

      if (name === 'title') {
        document.title = value.trim()
      }
    })
  }

  const tokens = marked.lexer(md)

  const forToken = (tokens, cb) => {
    for (let token of tokens) {
      if (token.items) {
        forToken(token.items, cb)
      } else if (token.tokens) {
        forToken(token.tokens, cb)
      } else {
        cb(token)
      }
    }
  }

  const parseAttrs = raw => {
    if (!raw) {
      return
    }

    const list = raw.split(' ')
    let classNames = []
    let id = ''
    let customAttrs = []

    for (let li of list) {
      if (li.indexOf('.') === 0) {
        classNames.push(li.slice(1))
        continue
      }

      if (li.indexOf('#') === 0) {
        id = li.slice(1)
        continue
      }

      const [name, value] = li.split('=')

      customAttrs.push(`${name}="${value}"`)
    }

    const className = classNames.join(' ')
    const customAttr = customAttrs.join(' ')

    return `${id ? `id="${id}"` : ''}${
      className ? ` className="${className}"` : ''
    }${customAttr ? ` ${customAttr}` : ''}`.trim()
  }

  forToken(tokens, token => {
    if (token.type === 'html' || !token.text) {
      return
    }

    token.attrs = ''

    const m = token.text.match(/^(.+)\s+\::(.+)\::$/)

    if (!m) {
      return
    }

    token.text = m[1]

    if (m[2]) {
      token.attrs = parseAttrs(m[2])
    }
  })

  return marked.parser(tokens)
}
