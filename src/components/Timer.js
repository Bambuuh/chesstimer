import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Button from './Button'
import { addMove } from '../actions/timerActions'
import timePrettifier, { getSeconds } from '../timePrettifier'

class Timer extends Component {

    shouldComponentUpdate(nextProps) {
        const a = nextProps.timers[nextProps.playerKey]
        const b = this.props.timers[this.props.playerKey]

        const baseTimeChanged = this.compareTimeObj(a.prettyTime, b.prettyTime)
        const movesChanged = a.moves !== b.moves
        const delayChanged = this.compareDelay(nextProps.delay, this.props.delay)
        const activePlayerChanged = nextProps.timers.activePlayer !== this.props.timers.activePlayer

        return baseTimeChanged || movesChanged || delayChanged || activePlayerChanged
    }

    compareDelay(a, b) {
        return getSeconds(a) !== getSeconds(b)
    }

    compareTimeObj(a, b) {
        return a.seconds !== b.seconds || a.minutes !== b.minutes || a.hours !== b.hours
    }

    getPrettyTime(timeObj) {
        let text = ''
        if (parseInt(timeObj.hours) > 0) {
            text = `${timeObj.hours}:${timeObj.minutes}:`
        } else if (parseInt(timeObj.minutes) > 0) {
            text = `${timeObj.minutes}:`
        }

        text += timeObj.seconds

        return <Text>{text}</Text>
    }

    onPress() {
        if (this.isActive()) {
            this.props.onPress()
            this.props.addMove(this.props.playerKey)
        }
    }

    isActive() {
        return this.props.timers.activePlayer === undefined || this.props.timers.activePlayer === this.props.playerKey
    }

    getText() {
        return this.props.timers.activePlayer === undefined ? 'Start' : 'Stop'
    }

    renderMoves() {
        const { timers, playerKey } = this.props
        const { moveThreshold } = timers.settings
        let text = `Moves: ${timers[playerKey].moves}`
        if (moveThreshold > 0 && timers[playerKey].moves < moveThreshold) {
            text += ` / ${moveThreshold}`
        }
        return <Text style={styles.movesStyle}>{text}</Text>
    }

    renderDelay() {
        const { delay, timers, playerKey } = this.props
        if (delay > 0 && timers.activePlayer === playerKey && timers.mode === 'Delay') {
            const prettyDelay = timePrettifier(delay)
            return <Text style={styles.delayStyle}>{this.getPrettyTime(prettyDelay)}</Text>
        } else {
            return <Text style={styles.delayStyle}> </Text>
        }
    }

    renderTimer() {
        const { timers, playerKey, style } = this.props
        return (
            <View style={[{width: '100%'}, style]}>
                <View style={{ position: 'relative' }}>
                    {!this.props.timers.activePlayer && <Text style={[styles.startTextStyle]}>Tap to start</Text>}
                    {this.renderDelay()}
                    <Text style={styles.timerStyles}> {this.getPrettyTime(timers[playerKey].prettyTime)} </Text>
                </View>
                {this.renderMoves()}
            </View>
        )
    }

    renderResult() {
        const text = this.props.timers[this.props.playerKey].time > 0 ? 'Winner' : 'Loser'
        return (
            <View style={this.props.style}>
                <Text style={styles.resultStyle}>{text}</Text>
                <Text style={styles.movesStyle}>in {this.props.timers[this.props.playerKey].moves} moves</Text>
            </View>
        )
    }

    render() {
        return this.props.timers.winner ? this.renderResult() : this.renderTimer()
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    delayStyle: {
        fontFamily: 'Courier New',
        backgroundColor: 'rgba(0,0,0,0)',
        textAlign: 'center',
        color: '#f39c12',
        fontSize: 20,
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0
    },
    startTextStyle: {
        fontFamily: 'Courier New',
        textAlign: 'center',
        color: '#f39c12',
        fontSize: 30,
        position: 'absolute',
        top: -40,
        left: 0,
        right: 0
    },
    timerStyles: {
        fontFamily: 'Courier New',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontSize: 60,
        marginBottom: 20
    },
    textStyles: {
        color: '#f39c12',
        textAlign: 'center',
        fontSize: 40
    },
    resultStyle: {
        fontSize: 80,
        color: 'white'
    },
    movesStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
})

mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { addMove })(Timer)
