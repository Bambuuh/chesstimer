import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'

import { changeView } from './actions/navActions'

import Configure from './components/views/configure'
import ModeView from './components/views/ModeView'
import TimerView from './components/views/TimerView'

class Root extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.onBackButtonPressed());
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.onBackButtonPressed());
    }

    onBackButtonPressed() {
        if (this.props.nav.view === 'timers') {
            this.props.changeView({ view: 'configure' })
            return true
        } else if (this.props.nav.view === 'configure') {
            this.props.changeView({ view: 'modes' })
            return true
        }
    }

    render() {
        switch (this.props.nav.view) {
            case 'modes':
                return <ModeView />
            case 'timers':
                return <TimerView style={{ flex: 1 }} />
            default:
                return <Configure style={{ flex: 1 }} />
        }
    }
}

const mapStateToProps = ({ nav }) => ({ nav })

export default connect(mapStateToProps, { changeView })(Root)
