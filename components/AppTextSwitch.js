import React, { useEffect, useState } from 'react'
import { View } from 'native-base'
import AppSwitch from './AppSwitch'
import MainColors from '../constants/MainColors'
import { StyleSheet } from 'react-native'
import produce from 'immer'
import HeadText from './HeadText'
import { isClear, SetFormMessage } from './index'

export default props => {
  const [state, setState] = useState({})

  useEffect(() => {
    setState(produce((draftState) => {
      draftState.inputLabel = !isClear(props.label) ? props.label : SetFormMessage(props.myName)
    }))
  }
  , [])

  return (
    <View style={{ ...styles.mainContainer, ...(props.bottomBorder ? styles.settingCard : {}), paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flex: 1 }}>
        <HeadText {...props} noMargin>
          {state.inputLabel}
        </HeadText>
      </View>
      <AppSwitch {...props} />
    </View>)
}

const styles = StyleSheet.create({
  settingCard: {
    borderBottomWidth: 1,
    borderColor: MainColors.fillBright
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

//  TODO  passing marginTop: 20
//
