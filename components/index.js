// Check also link 2020050608

import _ from 'lodash'
import { Alert } from 'react-native'
import moment from 'moment'
import * as Sentry from 'sentry-expo'
import { produce } from 'immer'

// Keys: 'submitCount', 'touched', 'isValid', 'dirty', 'isValidating'
export const FormKeys = ['isSubmitting', 'values', 'errors']

export const userKindValues = {
  volunteer: 'Individual', influencer: 'Influencer', brand: 'Brand', nonprofit: 'Non-Profit'
}

export const HandleError = (error) => {
  Sentry.Native.captureException(error)
  const errorText = error.toString()
  const myResponse = error.response
  const myRequest = error.request

  let myObject = ''
  let dataMessage = ''
  let errorUrl = ''
  let responseStatus = ''

  if (!isClear(error.config) && !isClear(error.config.url)) {
    errorUrl = error.config.url
  }

  if (!isClear(myResponse)) {
    myObject = JSON.stringify(myResponse)

    if (!isClear(myResponse.data)) {
      dataMessage = myResponse.data.message
    }

    if (!isClear(myResponse.status)) {
      responseStatus = myResponse.status
    }
  } else if (!isClear(myRequest)) {
    myObject = JSON.stringify(myRequest)
  }

  const consoleText = `${errorText} #url: ${errorUrl} #status: ${responseStatus} #message: ${dataMessage} #object: ${myObject} #complete: ${JSON.stringify(error)}`
  console.log(consoleText)

  setTimeout(() => {
    Alert.alert('Error Response', `${errorText} #url: ${errorUrl} #status: ${responseStatus} #message: ${dataMessage} #object: ${myObject.replace(/[,\\]/g, ' ')}`)
  }, 100)
}

export const LogInState = (response, props) => {
  // console.log('93836', response.data.accessToken)
  props.PutUserInfo({
    userId: response.data.userId,
    userType: response.data.userType,
    templateType: response.data.templateType,
    accessToken: response.data.accessToken,
    accessExpiration: GetExpiration(response.data.expiresIn)
  })
  // BNV-1632: changed SetLaunch to allow for cause selection page before home page, now requires two arguments
  setTimeout(() => props.SetLaunch({isLoggedIn: true, isChoosingCauses: false}), 500)
}

export const GetExpiration = (expiresIn) => {
  return moment.utc().add(expiresIn, 'minute').toISOString()
}

export const isClear = (useValue) => {
  // https://medium.com/@trmaphi/lodash-isempty-value-you-might-be-using-it-the-wrong-way-d83210d7decf
  return _.isUndefined(useValue) || _.isNull(useValue) || Number.isNaN(useValue) ||
    (_.isArray(useValue) && useValue.length === 0) ||
    (_.isString(useValue) && useValue.length === 0) ||
    (_.isObject(useValue) && Object.keys(useValue).length === 0)
}

export const AreFormEqual = (oldProps, newProps) =>
  oldProps.isSubmitting === newProps.isSubmitting &&
  oldProps.values[oldProps.myName] === newProps.values[newProps.myName] &&
  oldProps.errors[oldProps.myName] === newProps.errors[newProps.myName]

export const SetFormMessage = (textValue) => {
  const useValue = textValue.replace(/_/g, ' ').replace(/\[object Object]/g, '')
  return useValue.charAt(0).toUpperCase() + useValue.slice(1)
}

export const ValidateUrl = (dataField, formValues, fieldErrors) => {
  if (!isClear(formValues[dataField]) && !IsValidUrl(formValues[dataField])) {
    fieldErrors[dataField] = `${dataField} must be a valid URL`
  }
}

// https://stackoverflow.com/a/5717133/6227407
export const IsValidUrl = myValue => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

  try {
    new URL(myValue);
    return !!pattern.test(myValue);
  } catch(err) {
    console.log(err)
    return false;
  }
}

export const ValidateActivityOneMember = (titleName, causeMembers, fieldErrors) => {
  if (causeMembers.filter(actualItem => actualItem.isSelected).length === 0) {
    fieldErrors[titleName] = `Select one or more ${titleName.toLowerCase()}`
  }

}
export const ValidatePostOneMember = (titleName, causeMembers, fieldErrors) => {
  if (causeMembers.filter(actualItem => actualItem.isSelected).length >= 2) {
    fieldErrors[titleName] = `Select only one ${titleName.toLowerCase()}`
  }
}

export const ValidateCollaborator = (prettyName, mainMembers, reasonField, goodsField, moneyField, formValues, fieldErrors) => {
  if (!isClear(SetIds(mainMembers)) && isClear(formValues[reasonField]) && isClear(formValues[goodsField]) && isClear(formValues[moneyField])) {
    fieldErrors[reasonField] = `${prettyName} questions are required`
  }
}

export const ValidateDateOnPast = (dateValue, durationNumber = 0) => {
  const momentNow = moment.utc()
  if (!isClear(dateValue)) {
    const minutesLeft = moment.utc(dateValue).diff(momentNow, 'minutes')
    return minutesLeft <= durationNumber
  }
  return false
}

export const ValidateBirthDate = (dataField, formValues, fieldErrors) => {
  const momentNow = moment.utc()
  const periodTime = momentNow.diff(moment.utc(formValues[dataField]), 'days')

  // The user must reach 16 years old
  if (periodTime < 5840) {
    fieldErrors[dataField] = 'The user must reach the minimum age'
  }
}

export const ValidateActivityDate = (startDate, endDate, formValues, fieldErrors, minDuration) => {
  const startDateValidation = ValidateDateOnPast(formValues[startDate])
  if (startDateValidation) {
    fieldErrors[startDate] = `${startDate} cannot be in the past`
  }

  const endDateValidation = ValidateDateOnPast(formValues[endDate])
  if (endDateValidation) {
    fieldErrors[endDate] = `${endDate} cannot be in the past`
  }

  const currentDuration = moment.utc(formValues[endDate]).diff(moment.utc(formValues[startDate]), 'minutes')
  if (currentDuration < minDuration) {
    fieldErrors[startDate] = `The duration needs to be at least ${minDuration} minutes`
  }
}

export const GoToForYou = navigation => {
  Alert.alert(
    'Profile',
    'Thanks for looking around Benev! In order to best support your goals, we need to learn a little bit more about you. Please take a moment to fill out the Profile Settings',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => { navigation.goBack() }
      },
      {
        text: 'OK',
        onPress: () => navigation.navigate('ForYou')
      }
    ],
    { cancelable: false })
}

export const UserFinalCommand = (navigation) => {
  navigation.goBack()
  setTimeout(() => Alert.alert('Success!', 'Thank you for updating your profile. Your preferences have now been saved and updated in the app.'), 3000)
}

export const UserIdToProps = (state) => {
  return {
    userId: state.authReducer.userInfo.userId,
    userType: state.authReducer.userInfo.userType,
    templateType: state.authReducer.userInfo.templateType
  }
}
export const ImageUrl = 'https://api.imgur.com/3/image'

export const UserKind = (templateType) => {
  if (!isClear(templateType)) {
    return userKindValues[templateType]
  } else if (!isClear(templateType)) {
    return userKindValues[templateType]
  }
}

export const SetCauseMembers = (SetState, myMembers) => {
  SetState(produce((draftState) => {
    draftState.causeMembers = myMembers
  }))
}

export const StartCauseMembers = (SetState, causesInfo, dataMode, dataCauses) => {
  SetCauseMembers(SetState, causesInfo.map(mapItem => ({
    id: mapItem.id,
    member_name: mapItem.cause_name,
    member_extra: mapItem.cause_description,
    image_url: mapItem.cause_image,
    isShown: true,
    isSelected: dataMode === 'update' &&
      dataCauses.some(filterItem => filterItem.id === mapItem.id)
  })))
}

export const StartUserMembers = userInfo =>
  userInfo.map(mapItem => ({
    id: mapItem.id,
    member_name: mapItem.name,
    member_subtitle: UserKind(mapItem.templateModel),
    image_url: mapItem.socialAvatarUrl,
    isShown: true,
    isSelected: true
  }))

export const UserTransform = myItems =>
  myItems.map(mapItem => ({
    id: mapItem.id,
    member_name: mapItem.name,
    member_subtitle: UserKind(mapItem),
    image_url: mapItem.socialAvatarUrl
  }))

export const SetIds = (actualMembers) => actualMembers.filter(actualItem => actualItem.isSelected).map(mapItem => mapItem.id)

/*
  Callback for the react profiler component.
  https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
*/
export function onRenderCallback (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime // when React committed this update
) {
  console.log(`${id}'s ${phase} phase:`) 
  console.log(`Actual Duration: ${actualDuration}`)
  console.log(`Base time: ${baseDuration}`)
  console.log(`Start time: ${startTime}`)
  console.log(`Commit time: ${commitTime}`)
  console.log(' ')
}
