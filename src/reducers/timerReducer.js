import { Vibration } from 'react-native'

import {
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS,
    SET_GAME_MODE,
    CHANGE_TIMER_SETTINGS,
    ADD_TIME
} from '../actions/types'
import gameModes from './gameModes'

const INITIAL_STATE = gameModes.suddenDeath

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            state = getUpdatedTimer(state, action.payload)
            if (state[action.payload].time <= 0) {
                Vibration.vibrate(500)
                state.winner = getOtherPlayer(action.payload)
            }
            return { ...state }

        case SET_ACTIVE_PLAYER:
            otherPlayer = getOtherPlayer(action.payload)
            state[otherPlayer] = { ...state[otherPlayer], moves: state[otherPlayer].moves + 1 }
            return { ...state, activePlayer: action.payload }

        case TOGGLE_PAUSED:
            return { ...state, paused: !state.paused }

        case RESET_TIMERS:
            return INITIAL_STATE

        case CHANGE_TIMER_SETTINGS:
            settings = { ...action.payload }
            return { ...state, settings }

        case ADD_TIME:
            return { ...state, [action.payload]: { ...state[action.payload], time: state[action.payload].time + state.addTime.time } }

        case SET_TIMERS:
            const convertedTime = convertTimerObj(state.settings.baseTime)
            state.playerOne = { ...state.playerOne, time: convertedTime }
            state.playerTwo = { ...state.playerTwo, time: convertedTime }

            if (state.settings.addedTime) {
                if (state.mode === 'Delay') {
                    state.delay = convertTimerObj(state.settings.addedTime)
                } else {
                    state.addTime = {
                        time: convertTimerObj(state.settings.addedTime)
                    }
                }
            }

            if (state.settings.moveThreshold) {
                state.addTime.threshold = state.settings.moveThreshold
            }

            return { ...state }

        case SET_GAME_MODE:
            INITIAL_STATE = gameModes[action.payload]
            return INITIAL_STATE

        default:
            return state
    }
}

const getUpdatedTimer = (state, payload) => {

    if (state.mode === 'Hourglass') {
        const otherPlayer = getOtherPlayer(payload)
        state[otherPlayer] = { ...state[otherPlayer], time: state[otherPlayer].time + 1 }
    }

    return { ...state, [payload]: { ...state[payload], time: state[payload].time - 1 } }
}

const convertTimerObj = (timerObj) => {
    let result = 0
    if (timerObj.hours) {
        result += (parseInt(timerObj.hours) * 3600)
    }

    if (timerObj.minutes) {
        result += (parseInt(timerObj.minutes) * 60)
    }

    if (timerObj.seconds) {
        result += parseInt(timerObj.seconds)
    }

    return result
}

const getOtherPlayer = (player) => {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne'
}
