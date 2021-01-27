import {SEND_MESSAGE} from '../actionTypes'
import message from './message'

const messages = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return [
        ...state,
        message({}, action)
      ]
    default:
      return state
  }
}

export default messages
