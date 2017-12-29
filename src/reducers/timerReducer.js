import { TOGGLE_TIMER, UPDATE_TIMER, SET_ACTIVE_PLAYER, TOGGLE_PAUSED, RESET_TIMERS } from '../actions/types'

import {Dispatch} from 'redux'

const INITIAL_STATE = {
    playerOne: {
        time: 3,
    },
    playerTwo: {
        time: 3,
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
