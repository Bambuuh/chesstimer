import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Vibration } from 'react-native'

import { updateTimer, setActivePlayer, togglePaused, resetTimers, addTime, reduceAddTime } from '../../actions/timerActions'

import Timer from '../Timer'
import Button from '../Button'
import IconButton from '../IconButton'
import Dialog from '../Dialog'

class TimerView extends Component {

    constructor(props) {
        super(props)

        this.interval
        this.state = { delay: 0, showDialog: false }
    }

    reduceDelay(time) {
        this.setState({ delay: this.state.delay - time })
    }

    startTimer(playerKey) {
        const { timers } = this.props
        this.setState({ delay: this.props.timers.addTime })
        if (this.interval) {
            clearInterval(this.interval)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)

        if (timers.mode === 'Increment') {
            this.props.addTime(playerKey)
        }
        this.props.setActivePlayer(otherPlayer)

        if (timers.addTime > 0 && timers[playerKey].moves + 1 === timers.settings.moveThreshold) {
            this.props.addTime(playerKey)
        }

        let lastUpdate = Date.now()

        this.interval = setInterval(() => {
            if (this.props.timers.winner) {
                clearInterval(this.interval)
            } else {
                const now = Date.now()
                const delta = (now - lastUpdate)
                lastUpdate = now
                if (timers.mode === 'Delay') {
                    if (this.state.delay > 0) {
                        this.reduceDelay(delta)
                    } else {
                        this.props.updateTimer(otherPlayer, delta)
                    }
                } else {
                    this.props.updateTimer(otherPlayer, delta)
                }
            }
        }, 50)
    }

    getOtherPlayer(playerKey) {
        return playerKey === 'playerOne' ? 'playerTwo' : 'playerOne'
    }

    onPress(playerKey) {
        if (this.isActive(playerKey)) {
            Vibration.vibrate(100)
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
        return !!timers.winner || timers.paused || timers.activePlayer && timers.activePlayer !== playerKey
    }

    getTimerStyle(playerKey) {
        const { activePlayer, winner } = this.props.timers
        if (!winner && activePlayer && activePlayer !== playerKey) {
            return { opacity: 0.3 }
        }
    }

    getTimerContainerStyle() {
        if (this.props.timers.paused) {
            return { opacity: 0.1 }
        }
    }

    renderMenu() {
        const pausePlayIcon = this.props.timers.paused ? 'play' : 'pause'
        return (
            <View style={styles.menuStyle}>
                <IconButton name="undo" onPress={() => this.toggleDialog()} />
                <IconButton name={pausePlayIcon} onPress={() => this.togglePausePress()} />
                <IconButton name="home" onPress={() => this.goBack()} />
            </View>
        )
    }

    renderDialog() {
        const resetTimers = () => {
            this.props.resetTimers()
            this.toggleDialog()
        }
        return <Dialog text="Reset?" onAccept={() => resetTimers()} onDecline={() => this.toggleDialog()} />
    }

    toggleDialog() {
        if (!this.props.timers.paused) {
            this.togglePausePress()
        }
        this.setState({ showDialog: !this.state.showDialog })
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
                    <Timer delay={this.state.delay} style={rotation} playerKey={playerKey} />
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
                {this.state.showDialog && this.renderDialog()}
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
        flexDirection: 'row',
        left: 0,
        right: 0,
        top: (Dimensions.get('window').height / 2) - 25,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    dialogStyle: {
        position: 'absolute',
        left: (Dimensions.get('window').width / 2) - 100,
        top: (Dimensions.get('window').height / 2) - 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 200,
        height: 200,
        borderRadius: 4
    }
})

mapStateToProps = ({ timers }) => ({ timers })

export default connect(mapStateToProps, {
    updateTimer,
    setActivePlayer,
    togglePaused,
    resetTimers,
    addTime,
    reduceAddTime
})(TimerView)
