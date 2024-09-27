import React from 'react'
import { Text } from 'native-base'
import MainStyles from '../constants/MainStyles'
import { FormKeys, SetFormMessage } from './index'
import { onlyUpdateForKeys } from 'recompose'

const LastError = (props) => {
  const myEntries = Object.entries(props.errors)
  if (myEntries.length === 0) {
    return ReturnedValue()
  }

  const [validationKey, validationValue] = myEntries[0]
  if (props.touched[validationKey] || props.submitCount > 0) {
    return (
      <Text key={validationKey} style={{ ...MainStyles.errorMessage, marginVertical: 10 }}>
        {SetFormMessage(validationValue)}
      </Text>)
  } else {
    return ReturnedValue()
  }
}

const ReturnedValue = () => <Text> </Text>
export default onlyUpdateForKeys(FormKeys)(LastError)
