import { combineReducers } from 'redux'

import timers from './timerReducer'
import nav from './navReducer'

export default combineReducers({
    timers,
    nav
})