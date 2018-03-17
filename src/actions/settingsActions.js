import { UPDATE_SETTINGS } from './types'
import { save, get } from '../storage'

export const saveSettings = (newSettings) => {
    console.log("running")
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
            console.log(settings)
            if (settings !== null) {
                dispatch({
                    type: UPDATE_SETTINGS,
                    payload: settings
                })
            }
        })
    }
}