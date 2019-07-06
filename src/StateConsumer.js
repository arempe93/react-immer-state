import React, { Component } from 'react'

import ConsumerOptimization from './ConsumerOptimization'

export default (Consumer) => {
  class StateConsumer extends Component {
    static defaultProps = {
      impure: false,
      props: {},
      select: state => ({ state: state => state })
    }

    static getDerivedStateFromProps(props, state) {
      return {
        version: state.version + 1
      }
    }

    state = {
      version: 0
    }

    renderConsumer = (state) => {
      const { children, impure, props, render, select } = this.props
      const { version } = this.state

      const optimization = impure ? { version } : {}

      return (
        <ConsumerOptimization {...optimization} state={select(state, props)}>
          {typeof render === 'function' ? render : children}
        </ConsumerOptimization>
      )
    }

    render() {
      return (
        <Consumer>
          {this.renderConsumer}
        </Consumer>
      )
    }
  }

  return StateConsumer
}