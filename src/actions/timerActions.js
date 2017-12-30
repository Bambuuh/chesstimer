import {
    TOGGLE_TIMER,
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS,
    SET_GAME_MODE
} from './types'

export const toggleTimer = (player) => ({
    type: TOGGLE_TIMER,
    payload: player
})

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

export const setTimers = (timerObj) => ({
    type: SET_TIMERS,
    payload: timerObj
})

export const setGameMode = (gameMode) => ({
    type: SET_GAME_MODE,
    payload: gameMode
})