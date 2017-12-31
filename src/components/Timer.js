import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Button from './Button'

class Timer extends Component {
    prettifyTime() {
        const { time } = this.props.timers[this.props.playerKey]
        const hours = Math.floor(time/ 3600)
        const minutes = Math.floor((time - (hours * 3600)) / 60)
        const seconds = time - ((hours * 3600) + (minutes * 60))

        let final = ''
        if (parseInt(hours) > 0){
            final += `${this.prettifyNumber(hours)}:${this.prettifyNumber(minutes)}:`
        } else if (parseInt(minutes)) {
            final += `${this.prettifyNumber(minutes)}:`
        }

        final += `${this.prettifyNumber(seconds)}`
        return final
    }

    prettifyNumber(number) {
        return number < 10 ? `0${number}` : number
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

    renderMoves() {
        const { timers, playerKey } = this.props
        let text = `Moves: ${timers[playerKey].moves}`
        if (timers.addTime && timers.addTime.threshold > 0 && timers[playerKey].moves < timers.addTime.threshold) {
            text += ` / ${timers.addTime.threshold}`
        }
        return <Text style={styles.movesStyle}>{text}</Text>
    }

    renderTimer() {
        return (
            <View style={this.props.style}>
                <Text style={styles.timerStyles}> {this.prettifyTime()} </Text>
                <Text style={styles.textStyles}>
                    {this.getText()}
                </Text>
                {this.renderMoves()}
            </View>
        )
    }

    renderResult() {
        const text = this.props.timers[this.props.playerKey].time > 0 ? 'Winner': 'Loser'
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
        color: 'white',
        textAlign: 'center',
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

export default connect(mapStateToProps)(Timer)
