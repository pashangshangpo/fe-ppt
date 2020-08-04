import React from 'react'
import { getImageVideoUrl } from '$api'

export default class extends React.Component {
  state = {
    url: '',
  }

  componentDidMount() {
    const imageLength = Number(this.props.url.match(/\.size(.*)\.png/)[1])

    getImageVideoUrl(this.props.url, imageLength).then(url => {
      this.setState({
        url,
      })
    })
  }

  render() {
    if (!this.state.url) {
      return null
    }

    return <video src={this.state.url} controls></video>
  }
}
