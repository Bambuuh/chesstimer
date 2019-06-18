import {
  UPDATE_SETTINGS,
  RESET_WARNINGS,
  TRIGGER_WARNING
} from '../actions/types'
import { Action } from 'redux'

type SettingsState = {
  tapSounds: boolean
  warningSounds: boolean
  vibrations: boolean
  rotated: boolean
  warnings: Warnings
}

type Warnings = {
  [key: string]: {
    triggered: boolean
  }
}

const INITIAL_STATE: SettingsState = {
  tapSounds: true,
  warningSounds: true,
  vibrations: true,
  rotated: false,
  warnings: {}
}

export default (state = INITIAL_STATE, action: any) => {
  let warnings: Warnings
  switch (action.type) {
    case UPDATE_SETTINGS:
      const newState = { ...state, ...action.payload }
      newState.warnings = JSON.parse(JSON.stringify(action.payload.warnings))
      return newState

    case RESET_WARNINGS:
      warnings = { ...state.warnings }
      Object.keys(warnings).forEach(key => (warnings[key].triggered = false))
      return { ...state, warnings }

    case TRIGGER_WARNING:
      warnings = { ...state.warnings }
      warnings[action.payload].triggered = true
      return { ...state, warnings }

    default:
      return state
  }
}
