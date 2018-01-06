import { CHANGE_VIEW } from '../actions/types'

const INITIAL_STATE = { view: 'modes' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_VIEW:
            return { ...state, view: action.payload.view }

        default:
            return state
    }
}