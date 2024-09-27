import React, { memo, useState } from 'react'
import { Button, Text, View } from 'native-base'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import produce from 'immer'
import moment from 'moment'
import { AreFormEqual, isClear } from './index'
import { StyleSheet } from 'react-native'
import MainColors from '../constants/MainColors'
import AppValidation from './AppValidation'
import MainStyles from '../constants/MainStyles'

const BirthDateTimePicker = (props) => {
  const [state, setState] = useState({ isDateVisible: false, isTimeVisible: false })

  const TransformValue = () => {
    return isClear(props.values[props.myName]) ? new Date()
      : new Date(props.values[props.myName])
  }

  const SetDateVisible = (isVisible) => {
    setState(produce((draftState) => {
      draftState.isDateVisible = isVisible
    }))
  }
  // TODO  the margin is weird, need to fix it
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={styles.label}>{props.label}<Text style={MainStyles.errorMessage}> *</Text></Text>
      <Button onPress={() => SetDateVisible(true)} transparent style={styles.button}>
        <Text style={{ marginLeft: -10, color: MainColors.cleanBlack }}>
          {isClear(props.values[props.myName]) ? 'Date' : (moment.utc(TransformValue())).local().format('MMM D YYYY')}
        </Text>
      </Button>
      <DateTimePickerModal
        isVisible={state.isDateVisible}
        headerTextIOS={props.label}
        mode='date'
        display='spinner'
        isDarkModeEnabled={false}
        date={TransformValue()}
        onConfirm={(actualDate) => {
          SetDateVisible(false)
          const dateText = actualDate.toISOString().substring(0, 10)
          // console.log('dateText', dateText, actualDate.toISOString())
          props.setFieldValue(props.myName, dateText + TransformValue().toISOString().substring(10))
        }}
        onCancel={() => SetDateVisible(false)}
      />
      <AppValidation {...props} myName={props.myName} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    ...MainStyles.appTextItem,
    height: 35,
    marginLeft: 5,
    marginRight: -10
  },
  label: {
    ...MainStyles.textLabel,
    fontSize: 12,
    marginLeft: 15,
    color: MainColors.subTitle
  }
})

export default memo(BirthDateTimePicker, AreFormEqual)
