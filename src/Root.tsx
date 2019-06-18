import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSettings } from './actions/settingsActions'

import Navigation from './navigation'

type PropsFromDispatch = {
  getSettings: () => void
}

type Props = PropsFromDispatch

class Root extends Component<Props> {
  componentDidMount() {
    this.props.getSettings()
  }

  render() {
    return <Navigation />
  }
}

export default connect(
  null,
  { getSettings }
)(Root)
