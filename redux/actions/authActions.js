export const SET_LAUNCH = 'SET_LAUNCH'
export const PUT_USER_INFO = 'PUT_USER_INFO'
export const RESET_ALL = 'RESET_ALL'
export const SET_NOTIFICATION_COUNT = 'SET_NOTIFICATION_COUNT'

const ResetAll = () => ({ type: RESET_ALL })
const SetLaunch = (payloadValue) => ({ type: SET_LAUNCH, payloadValue })
const PutUserInfo = (payloadValue) => ({ type: PUT_USER_INFO, payloadValue })
const SetNotificationCount = (payloadValue) => ({ type: SET_NOTIFICATION_COUNT, payloadValue })

const mapDispatchToProps = {
  ResetAll,
  SetLaunch,
  PutUserInfo,
  SetNotificationCount
}

export default mapDispatchToProps
