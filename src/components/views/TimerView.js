import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

import { updateTimer, setActivePlayer, togglePaused, resetTimers } from '../../actions/timerActions'

import Timer from '../Timer'
import Button from '../Button'

class TimerView extends Component {

    constructor(props) {
        super(props)

        this.interval
    }

    startTimer(playerKey) {
        if (this.interval) {
            clearInterval(this.interval)
        }
        const newPlayer = this.getOtherPlayer(playerKey)
        this.props.setActivePlayer(newPlayer)
        this.props.updateTimer(newPlayer)
        this.interval = setInterval(() => this.props.updateTimer(newPlayer), 1000)
    }

    getOtherPlayer(playerKey) {
        return playerKey === 'playerOne' ? 'playerTwo' : 'playerOne'
    }

    onPress(playerKey) {
        if (this.isActive(playerKey)) {
            this.startTimer(playerKey)
        }
    }

    togglePausePress() {
        this.props.togglePaused()
        if (this.props.timers.paused) {
            if (this.props.timers.activePlayer) {

                const otherPlayer = this.getOtherPlayer(this.props.timers.activePlayer)
                this.startTimer(otherPlayer)
            }
        } else {
            if (this.interval) {
                clearInterval(this.interval)
            }
        }
    }

    isActive(playerKey) {
        return this.props.timers.activePlayer === undefined || this.props.timers.activePlayer === playerKey
    }

    isDisabled(playerKey) {
        const { timers } = this.props
        return timers.paused || timers.activePlayer && timers.activePlayer !== playerKey
    }

    getTimerStyle(playerKey) {
        if (this.props.timers.activePlayer && this.props.timers.activePlayer !== playerKey) {
            return { opacity: 0.3 }
        }
    }

    getTimerContainerStyle() {
        if (this.props.timers.paused) {
            return { opacity: 0.1 }
        }
    }

    renderMenu() {
        if (this.props.timers.paused) {
            return (
                <View style={styles.menuStyle}>
                    <Button style={styles.menuButtonStyle} onPress={() => this.togglePausePress()}>Start</Button>
                    <Button style={styles.menuButtonStyle} onPress={() => this.props.resetTimers()}>Reset</Button>
                    <Button style={styles.menuButtonStyle} onPress={() => this.goBack()}>Back</Button>
                </View>
            )
        } else {
            return (
                <View style={styles.pauseButtonStyle}>
                    <Button onPress={() => this.togglePausePress()}>Pause</Button>
                </View>
            )
        }
    }

    goBack() {
        this.props.resetTimers()
        this.props.goBack()
    }

    renderTimerView(playerKey, flipped) {
        const rotation = flipped ? { transform: [{ rotate: '180deg' }] } : {}
        return (
            <TouchableOpacity
                style={styles.touchableStyles}
                disabled={this.isDisabled(playerKey)}
                onPress={() => this.onPress(playerKey)}
            >
                <View style={this.getTimerStyle(playerKey)}>
                    <Timer style={rotation} playerKey={playerKey} />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { one, two, startCountDownOne, startCountDownTwo, stopCountDownOne, stopCountDownTwo } = this.props
        return (
            <View style={styles.containerStyles}>
                <View style={[styles.timerContainer, this.getTimerContainerStyle()]}>
                    {this.renderTimerView('playerOne', true)}
                    {this.renderTimerView('playerTwo', false)}
                </View>
                {this.renderMenu()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%'
    },
    containerStyles: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    timerContainer: {
        flex: 1
    },
    pauseButtonStyle: {
        position: 'absolute',
        left: (Dimensions.get('window').width / 2) - 100,
        top: (Dimensions.get('window').height / 2) - 25,
    },
    menuStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuButtonStyle: {
        marginVertical: 20
    }
})

mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, { updateTimer, setActivePlayer, togglePaused, resetTimers })(TimerView)
