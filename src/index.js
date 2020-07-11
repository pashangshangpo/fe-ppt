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
let pageIndex = 1

marked.use({
	renderer: {
		heading: (text, level) => {
			return `<h${level}>${text}</h${level}>\n`
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
				}

				else if (li === 'style') {
					const styleDom = document.createElement('style')
					styleDom.innerHTML = value

					document.body.appendChild(styleDom)
					return ''
				}

				else if (li.indexOf('background') === 0) {
					if (li.indexOf('http') > -1) {
						style += `background: url('${li.slice(li.indexOf(':') + 1)}') no-repeat;background-size: cover;`
					} else {
						style += `background: ${li.slice(li.indexOf(':') + 1)};`
					}
				}
				
				else if (li.indexOf('.') === 0) {
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