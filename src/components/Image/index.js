import React from 'react'

export default class extends React.Component {
  handleClick = () => {
    window.open(this.props.src)
  }

  render() {
    return <img src={this.props.src} onDoubleClick={this.handleClick} />
  }
}
