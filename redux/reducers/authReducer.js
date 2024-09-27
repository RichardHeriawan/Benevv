import produce from 'immer'
import * as authActions from '../actions/authActions'

const initialState = {
  isLoggedIn: false,
  userInfo: {},
  notificationCount: -1
}

const authReducer = (state = initialState, action) => {
  // console.log('myReducer', state, action)

  switch (action.type) {
    case authActions.SET_LAUNCH:
      return produce(state, (draft) => {
        draft.isLoggedIn = action.payloadValue.isLoggedIn,
        draft.isChoosingCauses = action.payloadValue.isChoosingCauses // BNV-1632: to allow access to API before going to home screen (to select causes upon first register), additional field
      })
    case authActions.PUT_USER_INFO:
      return produce(state, (draft) => {
        draft.userInfo = action.payloadValue
      })
    case authActions.SET_NOTIFICATION_COUNT:
      return produce(state, (draft) => {
        draft.notificationCount = action.payloadValue
      })
    default: {
      return state
    }
  }
}

export default authReducer
