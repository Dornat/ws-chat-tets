import {MessageType} from "../lib/types";

export const getUser = (store): string => {
  return store.user
}

export const getMessages = (store): Array<MessageType> => {
  return store.messages
}

export const getCurrentMessage = (store): string => {
  return store.message
}
