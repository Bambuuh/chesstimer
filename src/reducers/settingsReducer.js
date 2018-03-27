import { UPDATE_SETTINGS } from '../actions/types'

const INITIAL_STATE = {
    sounds: false,
    vibrations: true,
    rotated: false,
    warnings: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            console.log(action.payload)
            return { ...state, ...action.payload }
        
        default:
            return state
    }
}