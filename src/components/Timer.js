import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Button from './Button'
import { addMove } from '../actions/timerActions'

class Timer extends Component {

    shouldComponentUpdate(nextProps) {
        const a = nextProps.timers[nextProps.playerKey]
        const b = this.props.timers[this.props.playerKey]
        return this.compareTime(a.prettyTime, b.prettyTime) || a.moves !== b.moves
    }

    compareTime(a, b) {
        return a.seconds !== b.seconds || a.minutes !== b.minutes || a.hours !== b.hours
    }

    getPrettyTime() {
        const { prettyTime } = this.props.timers[this.props.playerKey]
        let text = ''
        if (parseInt(prettyTime.hours) > 0) {
            text = `${prettyTime.hours}:${prettyTime.minutes}:`
        } else if (parseInt(prettyTime.minutes) > 0) {
            text = `${prettyTime.minutes}:`
        }

        text += prettyTime.seconds

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

    renderTimer() {
        return (
            <View style={this.props.style}>
                <Text style={styles.timerStyles}> {this.getPrettyTime()} </Text>
                <Text style={styles.textStyles}>
                    {this.getText()}
                </Text>
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
    timerStyles: {
        fontFamily: 'Courier New',
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
        marginTop: 20,
        fontSize: 20
    }
})

mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { addMove })(Timer)
