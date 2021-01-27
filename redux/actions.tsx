import {CREATE_USER, SEND_MESSAGE} from './actionTypes'
import moment from 'moment'

export const createUser = name => ({
  type: CREATE_USER,
  payload: {
    name
  }
})

export const sendMessage = (user, content) => ({
  type: SEND_MESSAGE,
  payload: {
    type: 'user',
    user,
    content,
    sentAt: moment().format('HH:mm L')
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
