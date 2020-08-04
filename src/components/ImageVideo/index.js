import React from 'react'
import { getImageVideoUrl } from '$api'

import './index.scss'

export default class extends React.Component {
  state = {
    url: '',
    paused: true,
  }

  componentDidMount() {
    const imageLength = Number(this.props.url.match(/\.size(.*)\.png/)[1])

    getImageVideoUrl(this.props.url, imageLength).then(url => {
      this.setState({
        url,
      })
    })
  }

  handleClick = () => {
    if (this.state.paused) {
      this.videoRef.play()
      this.setState({
        paused: false,
      })
      return
    }

    this.videoRef.pause()
    this.setState({
      paused: true,
    })
  }

  render() {
    if (!this.state.url) {
      return null
    }

    return (
      <span
        className={'image-video-com ' + (this.state.paused ? 'paused' : '')}
        onClick={this.handleClick}
      >
        <video ref={ref => (this.videoRef = ref)} src={this.state.url}></video>
      </span>
    )
  }
}
