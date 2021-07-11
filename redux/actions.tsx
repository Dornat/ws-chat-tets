import {CREATE_MESSAGE, CREATE_USER, SEND_MESSAGE} from './actionTypes'
import moment from 'moment'
import {v4} from 'uuid'

export const createUser = name => ({
  type: CREATE_USER,
  payload: {
    name
  }
})

export const createMessage = content => ({
  type: CREATE_MESSAGE,
  payload: {
    content
  }
})

export const sendMessage = (user, content) => ({
  type: SEND_MESSAGE,
  payload: {
    id: v4(),
    type: 'user',
    user,
    content,
    sentAt: moment().unix()
  }
})

export const sendSysMessage = (content) => ({
  type: SEND_MESSAGE,
  payload: {
    id: v4(),
    type: 'system',
    user: 'system',
    content,
    sentAt: moment().unix()
  }
})
