import {CREATE_USER, UPDATE_USER_ID} from '../actionTypes'

const user = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      const {id, name} = action.payload
      return {
        id,
        name
      }
    case UPDATE_USER_ID:
      const newId = action.payload.id
      return {
        ...state,
        id: newId
      }
    default:
      return state
  }
}

export default user
