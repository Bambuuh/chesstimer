import { Vibration } from 'react-native'

import {
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS,
    SET_GAME_MODE,
    CHANGE_TIMER_SETTINGS,
    ADD_TIME,
    ADD_MOVE,
    REDUCE_ADD_TIME
} from '../actions/types'

import getPrettyTimeObj from '../timePrettifier'

const INITIAL_STATE = getDefaultState('Sudden death')

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TIMER:
            state = { ...state }
            updateTimers(state, action.payload)
            if (state[action.payload.playerKey].time <= 0) {
                state.winner = getOtherPlayerKey(action.payload.playerKey)
            }

            const currentPlayerKey = action.payload.playerKey
            const otherPlayerKey = getOtherPlayerKey(action.payload.playerKey)

            state[currentPlayerKey].prettyTime = getPrettyTimeObj(state[currentPlayerKey].time)
            state[otherPlayerKey].prettyTime = getPrettyTimeObj(state[otherPlayerKey].time)

            return state

        case SET_ACTIVE_PLAYER:
            const newActivePlayerKey = action.payload
            const oldActivePlayerKey = getOtherPlayerKey(newActivePlayerKey)
            return {
                ...state,
                activePlayer: newActivePlayerKey,
                addTime: convertTimerObj(state.settings.addedTime)
            }

        case ADD_MOVE:
            return { ...state, [action.payload]: { ...state[action.payload], moves: state[action.payload].moves + 1 } }

        case TOGGLE_PAUSED:
            return { ...state, paused: !state.paused }

        case RESET_TIMERS:
            return {
                ...INITIAL_STATE,
                playerOne: {
                    ...INITIAL_STATE.playerOne,
                    moves: action.payload ? state.playerOne.moves : INITIAL_STATE.playerOne.moves
                },
                playerTwo: {
                    ...INITIAL_STATE.playerTwo,
                    moves: action.payload ? state.playerTwo.moves : INITIAL_STATE.playerTwo.moves 
                }
            }

        case CHANGE_TIMER_SETTINGS:
            settings = { ...action.payload }
            return { ...state, settings }

        case ADD_TIME:
            const newTime = state[action.payload].time + state.addTime
            const newPrettyTime = getPrettyTimeObj(newTime)
            return { ...state, [action.payload]: { ...state[action.payload], time: newTime, prettyTime: newPrettyTime } }

        case SET_TIMERS:
            state = { ...state, playerOne: { ...state.playerOne }, playerTwo: { ...state.playerTwo } }
            const convertedTime = convertTimerObj(state.settings.baseTime)
            state.playerOne = { moves: 0, time: convertedTime, prettyTime: getPrettyTimeObj(convertedTime) }
            state.playerTwo = { moves: 0, time: convertedTime, prettyTime: getPrettyTimeObj(convertedTime) }

            state.addTime = convertTimerObj(state.settings.addedTime)

            if (state.settings.moveThreshold) {
                state.addTime.threshold = state.settings.moveThreshold
            }
            INITIAL_STATE = { ...state, playerOne: { ...state.playerOne }, playerTwo: { ...state.playerTwo } }
            return { ...state }

        case SET_GAME_MODE:
            INITIAL_STATE = getDefaultState(action.payload)
            return { ...INITIAL_STATE }

        case REDUCE_ADD_TIME:
            return { ...state, addTime: state.addTime - action.payload }

        default:
            return state
    }
}

const updateTimers = (state, payload) => {
    if (state.mode === 'Hourglass') {
        const otherPlayer = getOtherPlayerKey(payload.playerKey)
        state[otherPlayer] = { ...state[otherPlayer], time: state[otherPlayer].time + payload.time }
    }
    state[payload.playerKey] = { ...state[payload.playerKey], time: state[payload.playerKey].time - payload.time }
    return state
}

const convertTimerObj = (timerObj) => {
    let result = 0
    if (timerObj.hours) {
        result += (parseInt(timerObj.hours) * 3600000)
    }

    if (timerObj.minutes) {
        result += (parseInt(timerObj.minutes) * 60000)
    }

    if (timerObj.seconds) {
        result += parseInt(timerObj.seconds) * 1000
    }

    return result
}

const getOtherPlayerKey = (player) => {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne'
}

function getDefaultState(mode) {
    return {
        mode,
        settings: getDefaultSettings(mode),
        playerOne: {
            time: 0,
            prettyTime: {},
            moves: 0
        },
        playerTwo: {
            time: 0,
            prettyTime: {},
            moves: 0
        },
        activePlayer: undefined,
        paused: false,
        winner: undefined,
        addTime: {
            threshold: 0,
            time: 0
        }
    }
}

function getDefaultSettings(mode) {
    const settings = {
        baseTime: {
            hours: '00',
            minutes: '05',
            seconds: '00',
        },
        addedTime: {
            hours: '00',
            minutes: '00',
            seconds: '00',
        },
        moveThreshold: 0,
    }

    switch (mode) {
        case 'Sudden death':
            return settings
        case 'Fixed':
            settings.baseTime.minutes = '01'
            return settings
        case 'Hourglass':
            settings.baseTime.minutes = '01'
            return settings
        case 'Overtime':
            settings.baseTime.hours = '01'
            settings.baseTime.minutes = '30'
            settings.addedTime.minutes = '30'
            settings.moveThreshold = 40
            return settings
        case 'Delay':
            settings.baseTime.minutes = '01'
            settings.baseTime.seconds = '30'
            settings.addedTime.seconds = '10'
            delete settings.addedTime.hours
            delete settings.addedTime.minutes
            return settings
        case 'Increment':
            settings.baseTime.minutes = '01'
            settings.addedTime.seconds = '10'
            delete settings.addedTime.minutes
            return settings
    }
}
