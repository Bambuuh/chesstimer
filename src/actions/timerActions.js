import {
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS,
    SET_GAME_MODE,
    CHANGE_TIMER_SETTINGS,
    ADD_TIME
} from './types'

export const updateTimer = (playerKey) => ({
    type: UPDATE_TIMER,
    payload: playerKey
})

export const setActivePlayer = (playerKey) => ({
    type: SET_ACTIVE_PLAYER,
    payload: playerKey
})

export const togglePaused = () => ({
    type: TOGGLE_PAUSED,
})

export const resetTimers = () => ({
    type: RESET_TIMERS
})

export const setTimers = () => ({
    type: SET_TIMERS
})

export const setGameMode = (gameMode) => ({
    type: SET_GAME_MODE,
    payload: gameMode
})

export const changeTimerSettings = (settings) => ({
    type: CHANGE_TIMER_SETTINGS,
    payload: setting
})

export const addTime = (player) => ({
    type: ADD_TIME,
    payload: player
})