import { TOGGLE_TIMER, UPDATE_TIMER, SET_ACTIVE_PLAYER, TOGGLE_PAUSED, RESET_TIMERS } from '../actions/types'

import {Dispatch} from 'redux'

const INITIAL_STATE = {
    playerOne: {
        time: 300,
    },
    playerTwo: {
        time: 300,
    },
    activePlayer: undefined,
    paused: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TIMER:

        case UPDATE_TIMER:
            state[action.payload] = { ...state[action.payload], time: state[action.payload].time - 1 }
            return { ...state }
        
        case SET_ACTIVE_PLAYER:
            return {...state, activePlayer: action.payload }

        case TOGGLE_PAUSED:
            return { ...state, paused: !state.paused }

        case RESET_TIMERS: {
            return INITIAL_STATE
        }

        default:
            return state
    }
}

const getOtherPlayer = (player) => {
    return player === 'playerOne' ? 'playerTwo' : 'playerOne'
}
