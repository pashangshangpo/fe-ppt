import React from 'react'
import ReactDOM from 'react-dom'
import SwiperCore, {
	A11y,
	Autoplay,
	Controller,
	EffectCoverflow,
	EffectCube,
	EffectFade,
	EffectFlip,
	HashNavigation,
	History,
	Keyboard,
	Lazy,
	Mousewheel,
	Navigation,
	Pagination,
	Parallax,
	Scrollbar,
	Thumbs,
	Virtual,
	Zoom
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Row, Col } from 'antd'
import JsxParser from 'react-jsx-parser'
import ViewShow from '$components/ViewShow'
import { getPPT } from '$api'
import marked from 'marked'

import 'swiper/swiper-bundle.min.css'
import 'animate.css/animate.min.css'
import 'antd/dist/antd.css'
import './style/index.css'

SwiperCore.use([
	A11y,
	Autoplay,
	Controller,
	EffectCoverflow,
	EffectCube,
	EffectFade,
	EffectFlip,
	HashNavigation,
	History,
	Keyboard,
	Lazy,
	Mousewheel,
	Navigation,
	Pagination,
	Parallax,
	Scrollbar,
	Thumbs,
	Virtual,
	Zoom
])

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
	<Swiper
	pagination={{
		dynamicBullets: true
	}}
	keyboard={{
		enabled: true
	}}
>
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

	ReactDOM.render(<Main />, document.body.appendChild(document.createElement('div')));
})