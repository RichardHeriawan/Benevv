import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import produce from 'immer'
import authReducer from './authReducer'
import * as genericActions from '../actions/genericActions'
import { RESET_ALL } from '../actions/authActions'

const initialState = {
  // Put initial values here
}

const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case genericActions.SET_TEMPORAL:
      return produce(state, (draft) => {
        draft.temporalState = action.payloadValue
      })
    default: {
      return state
    }
  }
}

// https://stackoverflow.com/a/51831112/6227407
const appReducer = combineReducers({
  authReducer, genericReducer
})

export default (state, action) => {
  if (action.type === RESET_ALL) {
    state = undefined
    AsyncStorage.clear()
  }

  return appReducer(state, action)
}
