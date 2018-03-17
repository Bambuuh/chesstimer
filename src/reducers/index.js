import { combineReducers } from 'redux'

import timers from './timerReducer'
import nav from './navReducer'
import settings from './settingsReducer'

export default combineReducers({
    timers,
    nav,
    settings,
})