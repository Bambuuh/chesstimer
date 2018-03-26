import { combineReducers } from 'redux'

import timers from './timerReducer'
import settings from './settingsReducer'

export default combineReducers({
    timers,
    settings,
})