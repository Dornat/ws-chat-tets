import {CREATE_MESSAGE, SEND_MESSAGE} from '../actionTypes'

const message = (state = {}, action) => {
  const {id, type, user, content, sentAt} = action.payload
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        id,
        type,
        user,
        content,
        sentAt
      }
    case CREATE_MESSAGE:
      return {
        content
      }
    default:
      return state
  }
}

export default message
