import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import theme from '../../../styles/theme'

import { setTimers, changeTimerSettings } from '../../../actions/timerActions'

import Header from '../../Header'
import Button from '../../Button'
import Picker from '../../Picker'

import OvertimeSettings from './overtimeSettings'
import IncrementSettings from './incrementSettings'
import DelaySettings from './delaySettings'

class StartView extends Component {

    start() {
        this.props.setTimers()
        this.props.navigation.navigate('Timers')
    }

    renderStandardSettings() {
        return <Picker time={this.props.timers.settings.baseTime} onChange={(key, value) => this.updateSettings('baseTime', value, key)} />
    }

    renderOvertimeSettings() {
        return <OvertimeSettings settings={this.props.timers.settings} updateValue={(stateKey, value, key) => this.updateSettings(stateKey, value, key)} />
    }

    renderIncrementSettings() {
        return <IncrementSettings settings={this.props.timers.settings} updateValue={(stateKey, value, key) => this.updateSettings(stateKey, value, key)} />
    }

    renderDelaySettings() {
        return <DelaySettings settings={this.props.timers.settings} updateValue={(stateKey, value, key) => this.updateSettings(stateKey, value, key)} />
    }

    updateSettings(stateKey, value, key) {
        const { settings } = this.props.timers

        if (key) {
            settings[stateKey] = { ...settings[stateKey], [key]: value }
        } else {
            settings[stateKey] = value
        }
        this.props.changeTimerSettings(settings)
    }

    renderSettings() {
        switch (this.props.timers.mode) {
            case 'Overtime':
                return this.renderOvertimeSettings()
            case 'Increment':
                return this.renderIncrementSettings()
            case 'Delay':
                return this.renderDelaySettings()
            case 'Fixed':
            case 'Hourglass':
            default:
                return this.renderStandardSettings()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.modeStyle}>{this.props.timers.mode}</Text>
                {this.renderSettings()}
                <Button style={styles.buttonStyles} onPress={() => this.start()}>
                    Start
                </Button>
                <Button style={styles.buttonStyles} onPress={() => this.props.navigation.navigate('Settings')}>
                    Settings
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyles: {
        marginTop: (theme.baseline * 2)
    },
    modeStyle: {
        fontSize: 30,
        marginBottom: (theme.baseline * 2),
        color: theme.textColor,
    },
})

const mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { setTimers, changeTimerSettings })(StartView)
