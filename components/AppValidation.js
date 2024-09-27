import React, { memo } from 'react'
import { Text } from 'native-base'
import MainStyles from '../constants/MainStyles'
import { AreFormEqual, SetFormMessage } from './index'

const AppValidation = (props) => {
  return (
    <Text style={MainStyles.errorMessage}>
      {(props.touched[props.myName] || props.submitCount > 0) && // http://tiny.cc/5b8eoz
      props.myName in props.errors ? SetFormMessage(props.errors[props.myName]) : ' '}
    </Text>)
}

export default memo(AppValidation, AreFormEqual)
