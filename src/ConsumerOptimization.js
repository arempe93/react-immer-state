import React, { Component } from 'react'

class ConsumerOptimization extends Component {
  static defaultProps = {
    version: null
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.version !== nextProps.version) {
      return true
    }

    return !!Object.keys(this.props.state).find(key => (
      this.props.state[key] !== nextProps.state[key]
    ))
  }

  render() {
    const { children, state } = this.props

    return children(state)
  }
}

export default ConsumerOptimization