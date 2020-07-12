import React from 'react'
import ReactDOM from 'react-dom'
import JsxParser from 'react-jsx-parser'
import { getPPT } from '$api'
import markdown from '$common/markdown'
import WebSlides from '$common/webSlides'

import 'animate.css/animate.min.css'
import './style/index.scss'

const url = location.href.split('?ppt=')[1]
const md = window.MD
const render = md => {
	md = markdown(md)

	class Main extends React.Component {
		componentDidMount() {
			new WebSlides()
		}

		render() {
			return <JsxParser jsx={`<div id="webslides">${md}</div>`} />
		}
	}

	const dom = document.createElement('div')
	dom.id = 'app'

	ReactDOM.render(<Main />, document.body.appendChild(dom))
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
