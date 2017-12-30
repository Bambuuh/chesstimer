import {
    TOGGLE_TIMER,
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS
} from '../actions/types'

import {Dispatch} from 'redux'

const INITIAL_STATE = {
    playerOne: {
        time: 300,
        moves: 0,
    },
    playerTwo: {
        time: 300,
        moves: 0,
    },
    activePlayer: undefined,
    paused: false,
    winner: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TIMER:

        case UPDATE_TIMER:
            state[action.payload] = { ...state[action.payload], time: state[action.payload].time - 1 }
            
            if (state[action.payload].time <= 0) {
                state.winner = getOtherPlayer(action.payload)
            }

            return { ...state }
        
        case SET_ACTIVE_PLAYER:
            otherPlayer = getOtherPlayer(action.payload)
            state[otherPlayer] = { ...state[otherPlayer], moves: state[otherPlayer].moves + 1 }
            return {...state, activePlayer: action.payload }

        case TOGGLE_PAUSED:
            return { ...state, paused: !state.paused }

        case RESET_TIMERS: {
            return INITIAL_STATE
        }

        case SET_TIMERS: {

            const convertedTime = convertTimerObj(action.payload)

            state.playerOne = { ...state.playerOne, time: convertedTime }
            state.playerTwo = { ...state.playerTwo,  time: convertedTime }
            return { ...state }
        }

        default:
            return state
    }
}

const convertTimerObj = (timerObj) => {
    return (parseInt(timerObj.hours) * 3600) + (parseInt(timerObj.minutes) * 60) + parseInt(timerObj.seconds)
}

const getOtherPlayer = (player) => {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne'
}
