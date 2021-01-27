import {CREATE_USER, SEND_MESSAGE, UPDATE_USER_ID} from './actionTypes'
import {v4} from 'uuid'

export const createUser = name => ({
  type: CREATE_USER,
  payload: {
    id: v4(),
    name
  }
})

export const updateUserId = id => ({
  type: UPDATE_USER_ID,
  payload: {
    id
  }
})

export const sendMessage = (user, content) => ({
  type: SEND_MESSAGE,
  payload: {
    type: 'user',
    user,
    content
  }
})

export const sendSysMessage = (content) => ({
  type: SEND_MESSAGE,
  payload: {
    type: 'system',
    user: 'system',
    content
  }
})
