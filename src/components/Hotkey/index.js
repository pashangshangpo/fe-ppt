import React from 'react'

import './index.scss'

export default class Hotkey extends React.Component {
  /**
   * @def-start: Hotkey: props => Hotkey
   *  props: Object
   *    event: Object
   *      *: (key, event) => undefined *是要匹配的键 值是匹配时执行的方法
   *  children: Array => ReactElement
   *
   * 支持的组合键: meta ctrl alt shift
   * 使用方法: meta+a
   *
   * 常用键: delete return esc space left right up down copy paste
   *
   * 如需要同时使用多个,用空格隔开,如: meta+up meta+i
   *
   * 如果要使用此处未支持的键则使用keyCode作为键
   */
  static defaultProps = {
    event: {},
  }

  static combinationkeys = [
    {
      name: 'meta',
      key: 'metaKey',
      keyCode: 91,
    },
    {
      name: 'ctrl',
      key: 'ctrlKey',
      keyCode: 17,
    },
    {
      name: 'alt',
      key: 'altKey',
      keyCode: 18,
    },
    {
      name: 'shift',
      key: 'shiftKey',
      keyCode: 16,
    },
  ]

  static commonKeys = [
    {
      name: 'delete',
      keyCode: 8,
    },
    {
      name: 'delete',
      keyCode: 46,
    },
    {
      name: 'return',
      keyCode: 13,
    },
    {
      name: 'esc',
      keyCode: 27,
    },
    {
      name: 'space',
      keyCode: 32,
    },
    {
      name: 'left',
      keyCode: 37,
    },
    {
      name: 'up',
      keyCode: 38,
    },
    {
      name: 'right',
      keyCode: 39,
    },
    {
      name: 'down',
      keyCode: 40,
    },
  ]

  static joinKeys = [
    {
      name: 'copy',
      value: 'meta+67',
    },
    {
      name: 'paste',
      value: 'meta+86',
    },
    {
      name: 'cut',
      value: 'meta+88',
    },
    {
      name: 'undo',
      value: 'meta+90',
    },
    {
      name: 'redo',
      value: 'meta+89',
    },
    {
      name: 'copy',
      value: 'ctrl+67',
    },
    {
      name: 'paste',
      value: 'ctrl+86',
    },
    {
      name: 'cut',
      value: 'ctrl+88',
    },
    {
      name: 'undo',
      value: 'ctrl+90',
    },
    {
      name: 'redo',
      value: 'ctrl+89',
    },
  ]

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    let target = e.target
    const exist = ['textarea', 'input'].find(tag => {
      return target.tagName.toLowerCase() === tag
    })
    // 在mac中火狐按delete键回退到上个记录的问题
    if (!exist && e.keyCode === 8) {
      e.preventDefault()
    }

    // 谷歌浏览器meta+y是打开设置，所以阻止默认事件
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 89) {
      e.preventDefault()
    }

    if (target.getAttribute('contenteditable') === 'true' || exist) {
      return false
    }

    // 如果没有children则当做全局事件来处理
    if (target === this.dom || this.props.children == null) {
      this.processEvent(this.combination(e), e)
    }
  }

  combination = e => {
    const current = Hotkey.combinationkeys.find(
      item => e[item.key] && e.keyCode !== item.keyCode
    )

    const currentKey = Hotkey.commonKeys.find(
      item => e.keyCode === item.keyCode
    )

    if (current) {
      let key = `${current.name}+${e.keyCode} ${current.name}+${e.key}`

      if (currentKey) {
        return `${key} ${current.name}+${currentKey.name}`
      }

      return key
    }

    if (currentKey) {
      return `${currentKey.name} ${e.keyCode} ${e.key}`
    }

    return `${e.keyCode} ${e.key}`
  }

  processEvent = (key, e) => {
    const keys = key.split(' ')

    for (let name of keys) {
      const eventKeys = Object.keys(this.props.event)

      for (let eventKey of eventKeys) {
        if (
          eventKey.split(' ').some(item => {
            // 如果匹配并且名称相等
            let joinKey = Hotkey.joinKeys.find(
              joinKey => joinKey.value === name
            )

            if (joinKey && joinKey.name === item) {
              return true
            }

            return item === name
          })
        ) {
          this.props.event[eventKey](key, e)

          return
        }
      }
    }
  }

  render() {
    return React.createElement(
      'div',
      {
        tabIndex: -1,
        ref: ref => (this.dom = ref),
        className: 'hotkey',
      },
      this.props.children
    )
  }
}
