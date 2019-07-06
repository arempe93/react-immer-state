import hoist from 'hoist-non-react-statics'
import React, { Component } from 'react'

export default (StateConsumer) => (
  (select, consumerProps = {}) => (WrappedComponent) => {
    class WithState extends Component {
      render() {
        return (
          <StateConsumer {...consumerProps} props={this.props} select={select}>
            {(state) => (
              <WrappedComponent {...state} {...this.props} />
            )}
          </StateConsumer>
        )
      }
    }

    hoist(WithState, WrappedComponent)

    const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
    WithState.displayName = `WithState(${wrappedName})`

    return WithState
  }
)