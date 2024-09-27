import React, { memo } from 'react'
import { Body, CheckBox, Text, ListItem } from 'native-base'
import { AreFormEqual } from './index'

const AppCheckBox = (props) => {
  const OnPressCheck = () => {
    props.setFieldValue(props.myName, !props.values[props.myName])
  }

  // https://github.com/GeekyAnts/NativeBase-KitchenSink/blob/master/src/screens/checkbox/index.js
  return (
    <ListItem button onPress={OnPressCheck}>
      <CheckBox
        disabled={props.isSubmitting}
        checked={props.values[props.myName]}
        onPress={OnPressCheck}
      />
      <Body>
        <Text>{props.label}</Text>
      </Body>
    </ListItem>)
}

export default memo(AppCheckBox, AreFormEqual)
