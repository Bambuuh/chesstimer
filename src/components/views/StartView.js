import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { setTimers } from '../../actions/timerActions'

import Button from '../Button'
import Picker from '../Picker'

class StartView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            baseTime: {
                hours: '00',
                minutes: '05',
                seconds: '00',
            },
            timeToAdd: {
                hours: '00',
                minutes: '05',
                seconds: '00',
            },
            moveThreshold: 40
        }
    }

    onPress() {
        this.props.setTimers(this.state.baseTime)
        this.props.goToTimer()
    }

    renderSuddenDeathSettings() {
        return <Picker time={this.state.baseTime} onChange={(key, value) => this.updateValue('baseTime', key, value)} />
    }

    renderOvertimeSettings() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Base time</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.baseTime} onChange={(key, value) => this.updateValue('baseTime', key, value)} />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Turns</Text>
                    <Picker style={{ marginHorizontal: 10 }} items={this.getMovesList()} width={35} fontSize={15} selected={this.state.moveThreshold} onChange={(value) => this.setState({ moveThreshold: value })} />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Added</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.timeToAdd} onChange={(key, value) => this.updateValue('timeToAdd', key, value)} />
                </View>
            </View>
        )
    }

    renderIncrementSettings() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Base time</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.baseTime} onChange={(key, value) => this.updateValue('baseTime', key, value)} />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Incremented</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.timeToAdd} onChange={(key, value) => this.updateValue('timeToAdd', key, value)} />
                </View>
            </View>
        )
    }

    renderDelaySettings() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Base time</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.baseTime} onChange={(key, value) => this.updateValue('baseTime', key, value)} />
                </View>
                <View>
                    <Text style={styles.settingsHeaderStyle}>Delay</Text>
                    <Picker style={{ marginHorizontal: 10 }} width={35} fontSize={15} time={this.state.timeToAdd} onChange={(key, value) => this.updateValue('timeToAdd', key, value)} />
                </View>
            </View>
        )
    }

    getMovesList() {
        const moves = []

        for (let i = 5; i <= 100; i += 5) {
            moves.push({ label: `${i}`, value: `${i}` })
        }

        return moves
    }

    updateValue(stateKey, key, value) {
        console.log(stateKey, key, value)
        const newState = { ...this.state }
        newState[stateKey] = { ...newState[stateKey], [key]: value }
        this.setState(newState)
    }

    renderSettings() {
        switch (this.props.timers.mode) {
            case 'Overtime':
                return this.renderOvertimeSettings()
            case 'Increment':
                return this.renderIncrementSettings()
            case 'Delay':
                return this.renderDelaySettings()
            case 'Hourglass':
            default:
                return this.renderSuddenDeathSettings()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.modeStyle}>{this.props.timers.mode}</Text>
                {this.renderSettings()}
                <Button style={styles.buttonStyles} onPress={() => this.props.goToModeView()}>
                    Change mode
                </Button>
                <Button style={styles.buttonStyles} onPress={() => this.onPress()}>
                    Start
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
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 5
    },
    buttonStyles: {
        marginTop: 20
    },
    commaStyle: {
        fontSize: 20,
        paddingTop: 10,
        color: '#f39c12'
    },
    modeStyle: {
        fontSize: 30,
        marginBottom: 20,
        color: '#f39c12'
    },
    settingsHeaderStyle: {
        marginBottom: 10,
        color: '#f39c12',
        textAlign: 'center'
    }
})

const mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { setTimers })(StartView)
