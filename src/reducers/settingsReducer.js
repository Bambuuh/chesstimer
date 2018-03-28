import { UPDATE_SETTINGS } from '../actions/types'

const INITIAL_STATE = {
    tapSounds: true,
    warningSounds: true,
    vibrations: true,
    rotated: false,
    warnings: [],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
        console.log(state.warnings === action.payload.warnings)
            return { ...state, ...action.payload }
        
        default:
            return state
    }
}