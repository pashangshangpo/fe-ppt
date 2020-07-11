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
import { Swiper } from 'swiper/react'
import Hotkey from '$components/Hotkey'

import 'swiper/swiper-bundle.min.css'
import './index.scss'

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

export default class extends React.Component {
  componentDidMount() {
    this.index = 0
  }

  onEventLeft = () => {
    if (this.handleListEvent('left')) {
      this.Swiper.slidePrev()
    }
  }

  onEventRight = () => {
    if (this.handleListEvent('right')) {
      this.Swiper.slideNext()
    }
  }

  handleListEvent = type => {
    const list = Array.from(ReactDOM.findDOMNode(this).querySelectorAll('ul > li'))

    if (list.length === 0) {
      return true
    }

    if (type === 'right') {
      if (this.index + 1 > list.length) {
        return true
      }

      list[this.index].style.visibility = 'visible'

      this.index += 1

      return false
    } else if (type === 'left') {
      if (this.index - 1 < 0) {
        return true
      }

      list[this.index - 1].style.visibility = 'hidden'

      this.index -= 1

      return false
    }
  }

  handleSlideNextChange = () => {
  }

  handleSlidePrevChange = () => {
    setTimeout(() => {
      const list = Array.from(ReactDOM.findDOMNode(this).querySelectorAll('ul > li'))

      list.forEach(li => {
        li.style.visibility = 'visible'
      })
    })
  }

  render() {
    return (
      <div className="swiper-com">
        <Hotkey
          event={{
            left: this.onEventLeft,
            right: this.onEventRight,
          }}
        />
        <Swiper
          onSwiper={swiper => this.Swiper = swiper}
          onSlideNextTransitionEnd={this.handleSlideNextChange}
          onSlidePrevTransitionEnd={this.handleSlidePrevChange}
        >
          {this.props.children}
        </Swiper>
      </div>
    )
  }
}
