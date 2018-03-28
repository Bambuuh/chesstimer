import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Vibration, StatusBar } from 'react-native'
import KeepAwake from 'react-native-keep-awake'

import { updateTimer, setActivePlayer, togglePaused, resetTimers, addTime, reduceAddTime, addMove, setTimers } from '../../actions/timerActions'

import { click, timesUp } from '../../sounds'

import Timer from '../Timer'
import Button from '../Button'
import IconButton from '../IconButton'
import Dialog from '../Dialog'

class TimerView extends Component {

    static navigationOptions = {
        header: null,
        title: 'Welcome',
    };

    constructor(props) {
        super(props)

        this.interval
        this.state = { delay: 0, showReset: false, showBack: false }
    }

    componentDidMount() {
        KeepAwake.activate()
    }

    componentWillUnmount() {
        KeepAwake.deactivate()
        if (this.interval) {
            clearInterval(this.interval)
            this.props.resetTimers()
        }
    }

    reduceDelay(time) {
        this.setState({ delay: this.state.delay - time })
    }

    regularTimer(playerKey) {
        if (this.interval) {
            clearInterval(this.interval)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)
        this.props.setActivePlayer(otherPlayer)
        this.startLoop(otherPlayer)
    }

    fixedTimer(playerKey, wasPaused) {
        if (this.interval) {
            clearInterval(this.interval)
        }
        if (!wasPaused) {
            this.props.resetTimers(true)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)
        this.props.setActivePlayer(otherPlayer)
        this.startLoop(otherPlayer)
    }

    incrementTimer(playerKey, wasPaused) {
        if (this.interval) {
            clearInterval(this.interval)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)
        if (!wasPaused) {
            this.props.addTime(playerKey)
        }
        this.props.setActivePlayer(otherPlayer)
        this.startLoop(otherPlayer)
    }

    overtimerLoop(playerKey) {
        const { timers } = this.props
        if (this.interval) {
            clearInterval(this.interval)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)
        this.props.setActivePlayer(otherPlayer)
        if (timers.addTime > 0 && timers[playerKey].moves + 1 === timers.settings.moveThreshold) {
            this.props.addTime(playerKey)
        }
        this.startLoop(otherPlayer)
    }

    delayLoop(playerKey, wasPaused) {
        if (!wasPaused) {
            this.setState({ delay: this.props.timers.addTime })
        }
        if (this.interval) {
            clearInterval(this.interval)
        }
        const otherPlayer = this.getOtherPlayer(playerKey)
        this.props.setActivePlayer(otherPlayer)
        const updateFn = (delta) => {
            if (this.state.delay > 0) {
                this.reduceDelay(delta)
            } else {
                this.props.updateTimer(otherPlayer, delta)
            }
        }
        this.startLoop(otherPlayer, updateFn)
    }

    startLoop(otherPlayer, updateFn) {
        let lastUpdate = Date.now()
        this.interval = setInterval(() => {
            if (this.props.timers.winner) {
                clearInterval(this.interval)
            } else {
                const now = Date.now()
                const delta = (now - lastUpdate)
                lastUpdate = now
                if (updateFn) {
                    updateFn(delta)
                } else {
                    this.props.updateTimer(otherPlayer, delta)
                    if (this.props.timers[otherPlayer].time <= 0) {
                        if (this.props.settings.vibrations) {
                            Vibration.vibrate(500)
                        }
                        if (this.props.settings.warningSounds) {
                            timesUp.play()
                        }
                    }
                    console.log(this.props.timers[otherPlayer].time)
                }
            }
        }, 50)
    }

    startTimer(playerKey, wasPaused) {
        switch (this.props.timers.mode) {
            case 'Overtime':
                this.overtimerLoop(playerKey)
                break
            case 'Fixed':
                this.fixedTimer(playerKey, wasPaused)
                break
            case 'Delay':
                this.delayLoop(playerKey, wasPaused)
                break
            case 'Increment':
                this.incrementTimer(playerKey, wasPaused)
                break
            default:
                this.regularTimer(playerKey)
        }
    }

    getOtherPlayer(playerKey) {
        return playerKey === 'playerOne' ? 'playerTwo' : 'playerOne'
    }

    onPress(playerKey) {
        if (this.isActive(playerKey)) {
            if (this.props.settings.tapSounds) {
                click.stop(() => click.play());
            }
            if (this.props.settings.vibrations) {
                Vibration.vibrate(100)
            }
            this.props.addMove(playerKey)
            this.startTimer(playerKey)
        }
    }

    togglePausePress() {
        const { timers } = this.props
        if (timers.winner || !timers.activePlayer) {
            return;
        }

        const wasPaused = timers.paused

        this.props.togglePaused()
        if (timers.paused) {
            if (timers.activePlayer) {

                const otherPlayer = this.getOtherPlayer(timers.activePlayer)
                this.startTimer(otherPlayer, wasPaused)
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
                <IconButton name="undo" onPress={() => this.onResetPress()} />
                <IconButton name={pausePlayIcon} onPress={() => this.togglePausePress()} />
                <IconButton name="home" onPress={() => this.onHomePress()} />
            </View>
        )
    }

    onResetPress() {
        if (!this.props.timers.winner && this.props.timers.activePlayer) {
            this.showReset()
        } else {
            this.props.resetTimers()
        }
    }

    onHomePress() {
        if (!this.props.timers.winner && this.props.timers.activePlayer) {
            this.showBack()
        } else {
            this.goBack()
        }
    }

    renderResetDialog() {
        const resetTimers = () => {
            this.props.resetTimers()
            this.showReset()
        }
        return <Dialog text="Reset?" onAccept={() => resetTimers()} onDecline={() => this.showReset()} />
    }

    renderBackDialog() {
        return <Dialog text="Back to start?" onAccept={() => this.goBack()} onDecline={() => this.showBack()} />
    }

    showReset() {
        if (!this.props.timers.paused && this.props.timers.activePlayer) {
            this.togglePausePress()
        }
        this.setState({ showReset: !this.state.showReset })
    }

    showBack() {
        if (!this.props.timers.paused && this.props.timers.activePlayer) {
            this.togglePausePress()
        }
        this.setState({ showBack: !this.state.showBack })
    }

    goBack() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.props.resetTimers()
        this.props.navigation.pop()
    }

    renderTimerView(playerKey, flipped) {
        const rotation = flipped ? { transform: [{ rotate: '180deg' }] } : {}
        return (
            <TouchableOpacity
                style={styles.touchableStyles}
                disabled={this.isDisabled(playerKey)}
                onPress={() => this.onPress(playerKey)}
            >
                <View style={[{ width: '100%', height: '100%', padding: 20 }, this.getTimerStyle(playerKey)]}>
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
                {this.state.showReset && this.renderResetDialog()}
                {this.state.showBack && this.renderBackDialog()}
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
        justifyContent: 'space-around',
        paddingHorizontal: 40
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

mapStateToProps = ({ timers, settings }) => ({ timers, settings })

export default connect(mapStateToProps, {
    updateTimer,
    setActivePlayer,
    togglePaused,
    resetTimers,
    addTime,
    setTimers,
    reduceAddTime,
    addMove,
})(TimerView)
