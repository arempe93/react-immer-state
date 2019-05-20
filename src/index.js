import produce from 'immer'
import React, { Component } from 'react'

import createStateConsumer from './StateConsumer'
import createWithState from './withState'

const createState = (initialState = {}) => {
  let updateState = null

  const { Provider, Consumer } = React.createContext({})

  const mutate = (fn, cb = undefined) => {
    if (typeof updateState === 'function') {
      updateState(fn, cb)
    }

    initialState = produce(initialState, fn)
    if (typeof cb === 'function') cb()
  }

  class StateProvider extends Component {
    state = {}

    componentDidMount() {
      if (updateState !== null) {
        throw 'Only mount a single provider'
      }

      this.setState(initialState)
      updateState = this.updateState
    }

    componentWillUnmount() {
      updateState = null
    }

    updateState = (fn, cb) => this.setState(produce(fn), cb)

    render() {
      return (
        <Provider value={updateState ? this.state : initialState}>
          {this.props.children}
        </Provider>
      )
    }
  }

  const StateConsumer = createStateConsumer(Consumer)
  const withState = createWithState(StateConsumer)

  return {
    StateConsumer,
    StateProvider,
    mutate,
    withState
  }
}

export default createState
