import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSettings } from './actions/settingsActions'

import Navigation from './navigation'

class Root extends Component {

    componentDidMount() {
        this.props.getSettings();
    }

    render() {
        return (<Navigation />)
    }
}

export default connect(null, { getSettings })(Root)
