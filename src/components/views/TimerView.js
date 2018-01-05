import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Vibration, StatusBar } from 'react-native'

import { updateTimer, setActivePlayer, togglePaused, resetTimers, addTime, reduceAddTime, addMove } from '../../actions/timerActions'

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
            this.props.addMove(playerKey)
            this.startTimer(playerKey)
            Vibration.vibrate(100)
            
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
        if (this.interval) {
            clearInterval(this.interval)
        }
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
                <View style={[{ width: '100%', height: '100%', padding: 40}, this.getTimerStyle(playerKey)]}>
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
                </View>
                {this.renderMenu()}
                <View style={[styles.timerContainer, this.getTimerContainerStyle()]}>
                    {this.renderTimerView('playerTwo', false)}
                </View>
                {this.state.showDialog && this.renderDialog()}
            </View>
        )
    }
}

const menuHeight = 50
const timerHeight = (Dimensions.get('window').height / 2) - (menuHeight / 2) - (StatusBar.currentHeight / 2 || 0) 

const styles = StyleSheet.create({
    touchableStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    containerStyles: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    timerContainer: {
        width: '100%',
        height: timerHeight
    },
    pauseButtonStyle: {
        position: 'absolute',
        left: (Dimensions.get('window').width / 2) - 100,
        top: (Dimensions.get('window').height / 2) - 25,
    },
    menuStyle: {
        height: menuHeight,
        width: '100%',
        flexDirection: 'row',
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
    reduceAddTime,
    addMove
})(TimerView)
