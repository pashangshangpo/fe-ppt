import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'antd'
import JsxParser from 'react-jsx-parser'
import Swiper from '$components/Swiper'
import { SwiperSlide } from 'swiper/react'
import ViewShow from '$components/ViewShow'
import { getPPT } from '$api'
import marked from 'marked'

import 'animate.css/animate.min.css'
import 'antd/dist/antd.css'
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
			return `</ViewShow></SwiperSlide><SwiperSlide><ViewShow>`
		}
	}
})

getPPT(location.href.split('?ppt=')[1]).then(code => {
	code = marked(code)

	const main = `
<Swiper>
	<SwiperSlide><ViewShow>
	${code}
	</ViewShow></SwiperSlide>
</Swiper>
	`

	class Main extends React.Component {
		render() {
			return (
				<JsxParser
					components={{ Swiper, SwiperSlide, Row, Col, ViewShow }}
					jsx={main}
				/>
			)
		}
	}

	const dom = document.createElement('div')
	dom.id = 'app'

	ReactDOM.render(<Main />, document.body.appendChild(dom));
})