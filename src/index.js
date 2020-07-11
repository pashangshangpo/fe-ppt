import React from 'react'
import ReactDOM from 'react-dom'
import JsxParser from 'react-jsx-parser'
import { getPPT } from '$api'
import marked from 'marked'
import WebSlides from '$common/webSlides'

import './style/index.scss'

marked.setOptions({
	xhtml: true
})

marked.use({
	renderer: {
		heading: (text, level) => {
			return `<h${level}>${text}</h${level}>\n`
		},
		hr: () => {
			return `</section><section>`
		}
	}
})

getPPT(location.href.split('?ppt=')[1]).then(code => {
	code = marked(code)

	const main = `
	<div id="webslides">
	<section className="aligncenter">
	${code}
	</section>
	</div>
	`

	class Main extends React.Component {
		componentDidMount() {
			new WebSlides()
		}

		render() {
			return (
				<JsxParser
					jsx={main}
				/>
			)
		}
	}

	const dom = document.createElement('div')
	dom.id = 'app'

	ReactDOM.render(<Main />, document.body.appendChild(dom));
})