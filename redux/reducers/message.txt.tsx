import {SEND_MESSAGE} from '../actionTypes'

const message = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const {type, user, content} = action.payload
      return {
        type,
        user,
        content
      }
    default:
      return state
  }
}

export default message
