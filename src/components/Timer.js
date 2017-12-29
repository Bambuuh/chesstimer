import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Button from './Button'

class Timer extends Component {

    constructor(props) {
        super(props)

        this.interval
    }

    prettifyTime() {
        const { time } = this.props.timers[this.props.playerKey]
        const minutes = Math.floor(time / 60)
        let seconds = time - minutes * 60

        seconds = `${seconds}`.length <= 1 ? `0${seconds}` : seconds

        return `${minutes}:${seconds}`
    }

    onPress() {
        if (this.isActive()) {
            this.props.onPress()
        }
    }

    isActive() {
        return this.props.timers.activePlayer === undefined || this.props.timers.activePlayer === this.props.playerKey
    }

    getText() {
        return this.props.timers.activePlayer === undefined ? 'Start' : 'Stop'
    }

    render () {
        return (
            <View style={this.props.style}>
                <Text style={styles.timerStyles}> {this.prettifyTime()} </Text>
                <Text style={styles.textStyles}>
                    {this.getText()}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    timerStyles: {
        color: 'white',
        textAlign: 'center',
        fontSize: 60,
        marginBottom: 20
    },
    textStyles: {
        color: '#f39c12',
        textAlign: 'center',
        fontSize: 40
    }

})

mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps)(Timer)
