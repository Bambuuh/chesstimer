import {
    UPDATE_TIMER,
    SET_ACTIVE_PLAYER,
    TOGGLE_PAUSED,
    RESET_TIMERS,
    SET_TIMERS,
    SET_GAME_MODE,
    CHANGE_TIMER_SETTINGS,
    ADD_TIME,
    REDUCE_ADD_TIME,
    ADD_MOVE
} from './types'

export const updateTimer = (playerKey, time) => ({
    type: UPDATE_TIMER,
    payload: { playerKey, time }
})

export const setActivePlayer = (playerKey) => ({
    type: SET_ACTIVE_PLAYER,
    payload: playerKey
})

export const togglePaused = () => ({
    type: TOGGLE_PAUSED,
})

export const resetTimers = (keepMoves) => ({
    type: RESET_TIMERS,
    payload: keepMoves
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
    payload: settings
})

export const addTime = (player) => ({
    type: ADD_TIME,
    payload: player
})

export const reduceAddTime = (time) => ({
    type: REDUCE_ADD_TIME,
    payload: time
})

export const addMove = (playerKey) => ({
    type: ADD_MOVE,
    payload: playerKey
})