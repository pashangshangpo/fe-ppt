import React from 'react'
import ReactDOM from 'react-dom'
import JsxParser from 'react-jsx-parser'
import { getPPT } from '$api'
import fun from '$common/var'
import markdown from '$common/markdown'
import WebSlides from '$common/webSlides'
import parseConfig from '$common/parseConfig'
import Image from '$components/Image'
import Video from '$components/Video'
import ImageVideo from '$components/ImageVideo'

import 'animate.css/animate.min.css'
import './style/index.scss'

const url = location.href.split('?ppt=')[1]
const md = window.MD
const render = md => {
  const config = parseConfig(md)
  const funs = config.rules.filter(item => item.name === 'var') || []

  fun(config.md, funs).then(md => {
    md = markdown(md, config.rules)

    const isConfigRule = name => {
      return (
        (config.rules.find(item => item.name === name) || { value: 'false' })
          .value === 'true'
      )
    }

    class Main extends React.Component {
      componentDidMount() {
        new WebSlides({
          loop: isConfigRule('loop'),
          changeOnClick: false,
          autoslide: false,
          showIndex: false,
          navigateOnScroll: isConfigRule('navigateOnScroll'),
        })

        require('less')
      }

      render() {
        return (
          <JsxParser
            components={{ Image, Video, ImageVideo }}
            jsx={`<div id="webslides">${md}</div>`}
          />
        )
      }
    }

    const dom = document.createElement('div')
    dom.id = 'app'

    ReactDOM.render(<Main />, document.body.appendChild(dom))
  })
}

if (md) {
  render(md)
} else if (!url) {
  location.href = `/#slide=1/?ppt=`

  setTimeout(() => {
    document.write('请输入网址后面输入ppt地址')
  })
} else {
  getPPT(url).then(md => {
    render(md)
  })
}
