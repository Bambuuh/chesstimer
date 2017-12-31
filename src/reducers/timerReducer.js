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

const INITIAL_STATE = gameModes.increment

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            state = getUpdatedTimer(state, action.payload)
            if (state[action.payload].time <= 0) {
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
    return (parseInt(timerObj.hours) * 3600) + (parseInt(timerObj.minutes) * 60) + parseInt(timerObj.seconds)
}

const getOtherPlayer = (player) => {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne'
}
