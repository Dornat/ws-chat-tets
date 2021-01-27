import {CREATE_USER} from '../actionTypes'

const user = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      const {name} = action.payload
      return {
        name
      }
    default:
      return state
  }
}

export default user
