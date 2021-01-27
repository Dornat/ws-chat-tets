import {SEND_MESSAGE} from '../actionTypes'

const message = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const {type, user, content, sentAt} = action.payload
      return {
        type,
        user,
        content,
        sentAt
      }
    default:
      return state
  }
}

export default message
