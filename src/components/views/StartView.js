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
            hours: '00',
            minutes: '05',
            seconds: '00'
        }

        this.updateValue.bind(this)
    }

    onPress() {
        this.props.setTimers(this.state)
        this.props.goToTimer()
    }

    renderSuddenDeathSettings() {
        return <Picker time={this.state} onChange={(key, value) => this.updateValue(key,value)}/>
    }

    updateValue(key, value) {
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }

    renderSettings() {
        switch (this.props.timers.mode) {
            case 'Hourglass':
            case 'Overtime':
            case 'Increment':
            case 'Delay':
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
    }
})

const mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { setTimers })(StartView)
