import { UPDATE_SETTINGS, RESET_WARNINGS, TRIGGER_WARNING } from '../actions/types'

const INITIAL_STATE = {
    tapSounds: true,
    warningSounds: true,
    vibrations: true,
    rotated: false,
    warnings: {},
}

export default (state = INITIAL_STATE, action) => {
    let warnings
    switch (action.type) {
        case UPDATE_SETTINGS:
            return { ...state, ...action.payload }
        
        case RESET_WARNINGS:
            warnings = { ...state.warnings }
            Object.keys(warnings)
                .forEach(key => warnings[key].triggered = false)
            return { ...state, warnings }

        case TRIGGER_WARNING:
            warnings = { ...state.warnings }
            warnings[action.payload].triggered = true
            return { ...state, warnings }

        default:
            return state
    }
}