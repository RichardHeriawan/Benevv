import React from 'react'
import { Switch } from 'react-native'
import MainColors from '../constants/MainColors'

const AppSwitch = (props) => {
  // TODO remove this line if the user's alert get refactor
  // props.values[props.myName] = isClear(props.values[props.myName]) ? '1' : props.values[props.myName]

  return (
    <Switch
      value={props.values[props.myName] === '1'}
      onValueChange={() => {
        const latestValue = props.values[props.myName] === '1' ? '0' : '1'
        props.setFieldValue(props.myName, latestValue)

        if (typeof props.OnValueChange === 'function') {
          props.OnValueChange(props, latestValue)
        }
      }}
      trackColor={{ true: MainColors.primary }}
      disabled={props.isSubmitting || props.isDisabled}
    />)
}

// TODO add memo(..., AreFormEqual)
export default AppSwitch
