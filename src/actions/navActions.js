import { CHANGE_VIEW } from './types'

export const changeView = (navObj) => ({
    type: CHANGE_VIEW,
    payload: navObj
})