import React, { memo } from 'react'
import { View } from 'native-base'
import AppValidation from './AppValidation'
import { AreFormEqual } from './index'
import { StyleSheet } from 'react-native'
import MainColors from '../constants/MainColors'
import { Picker } from '@react-native-picker/picker'

const AppPicker = (props) => {
  return (
    <>
      <Picker
        mode="dropdown"
        enabled={!props.isSubmitting}
        selectedValue={props.values[props.myName]}
        onValueChange={props.handleChange(props.myName)}
        style={{ justifyContent: 'flex-start', marginLeft: -5 }}
      >
        {props.children}
      </Picker>
      <View style={styles.inputSeparator}/>
      <AppValidation {...props} myName={props.myName}/>
    </>)
}
const styles = StyleSheet.create({
  inputSeparator: {
    borderColor: MainColors.fillBright,
    borderBottomWidth: 1
  }
})
export default memo(AppPicker, AreFormEqual)
