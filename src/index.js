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
import JsxParser from 'react-jsx-parser'
import ViewShow from '$components/ViewShow'
import { getPPT } from '$api'

import 'swiper/swiper-bundle.min.css'
import 'animate.css/animate.min.css'
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

getPPT(location.href.split('?ppt=')[1]).then(code => {
	const lines = code.trim().split('\n')
	let sections = []
	let section = ''

	for (let line of lines) {
		if (line.trim() === '---') {
			sections.push(section)
			section = ''
			continue
		}

		section += line
	}

	sections.push(section)

	sections = sections.map(section => (`
		<SwiperSlide>
				<ViewShow>
					${section}
				</ViewShow>
		</SwiperSlide>
	`)).join('\n')

	const main = `
	<Swiper
	pagination={{
		dynamicBullets: true
	}}
	keyboard={{
		enabled: true
	}}
>
	${sections}
</Swiper>
	`

	class Main extends React.Component {
		render() {
			return (
				<JsxParser
					components={{ Swiper, SwiperSlide, ViewShow }}
					jsx={main}
				/>
			)
		}
	}

	ReactDOM.render(<Main />, document.body.appendChild(document.createElement('div')));
})