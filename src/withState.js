import hoist from 'hoist-non-react-statics'
import React, { Component } from 'react'

export default (StateConsumer) => (
  (select, consumerProps = {}) => (WrappedComponent) => {
    class WithState extends Component {
      render() {
        return (
          <StateConsumer {...consumerProps} select={select}>
            {(state) => (
              <WrappedComponent {...state} {...this.props} />
            )}
          </StateConsumer>
        )
      }
    }

    hoist(WithState, WrappedComponent)

    const wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    WithState.displayName = `WithState(${wrappedDisplayName})`

    return WithState
  }
)