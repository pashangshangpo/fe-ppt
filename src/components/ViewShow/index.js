import React from 'react'
import ReactDOM from 'react-dom'

const checkVisibleInDocument = component => {
  const node = ReactDOM.findDOMNode(component)

  const { x, y } = node.getBoundingClientRect()
  const windowWidth = window.innerWidth || document.documentElement.clientWidth
  const windowHeight = window.innerHeight || document.documentElement.clientHeight

  return x <= windowWidth && x >= 0 && y <= windowHeight && y >= 0
}

export default class extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        visible: checkVisibleInDocument(this)
      })
    }, 300)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        {this.state.visible ? this.props.children : null}
      </div>
    )
  }
}