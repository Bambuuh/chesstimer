import { UPDATE_SETTINGS, RESET_WARNINGS, TRIGGER_WARNING } from './types'
import { save, get } from '../storage'

export const saveSettings = (newSettings) => {
    return dispatch => {
        save(newSettings)
            .then(settings => dispatch({
                type: UPDATE_SETTINGS,
                payload: settings,
            }))
    }
}

export const getSettings = () => {
    return dispatch => {
        get().then(settings => {
            if (settings !== null) {
                Object.keys(settings.warnings).forEach(key => settings.warnings[key].triggered = false)
                dispatch({
                    type: UPDATE_SETTINGS,
                    payload: settings
                })
            }
        })
    }
}

export const resetWarnings = () => ({ type: RESET_WARNINGS })

export const triggerWarning = (key) => ({
    type: TRIGGER_WARNING,
    payload: key
})