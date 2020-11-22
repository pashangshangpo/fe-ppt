import React from 'react'

import './index.scss'

export default class extends React.Component {
  state = {
    url: this.props.url,
    paused: true,
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
