import React from 'react'
import ReactDOM from 'react-dom'
import JsxParser from 'react-jsx-parser'
import { getPPT } from '$api'
import marked from '$common/marked'
import WebSlides from '$common/webSlides'

import 'animate.css/animate.min.css'
import './style/index.scss'

marked.setOptions({
	xhtml: true
})

const warpTagNameList = []

marked.use({
	renderer: {
		heading: (text, level) => {
			return `<h${level}>${text}</h${level}>\n`
		},
		warp: text => {
			if (!text) {
				const tagName = warpTagNameList.pop()

				return `</${tagName}>\n`
			}

			const list = text.split(' ')
			const classNames = []
			let isPage = false

			list.forEach(li => {
				if (li === 'page') {
					isPage = true
				} else if (li.indexOf('.') === 0) {
					if (li.indexOf('.animate__') === 0) {
						classNames.push('animate__animated')
					}

					classNames.push(li.slice(1))
				}
			})

			const tagName = isPage ? 'section' : 'div'

			warpTagNameList.push(tagName)

			const names = classNames.join(' ')

			return `<${tagName}${names ? ` className="${names}"` : ''}>\n`
		}
	}
})

getPPT(location.href.split('?ppt=')[1]).then(code => {
	code = marked(code)

	class Main extends React.Component {
		componentDidMount() {
			new WebSlides()
		}

		render() {
			return (
				<JsxParser
					jsx={`<div id="webslides">${code}</div>`}
				/>
			)
		}
	}

	const dom = document.createElement('div')
	dom.id = 'app'

	ReactDOM.render(<Main />, document.body.appendChild(dom));
})