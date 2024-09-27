// Q2020070309
import React from 'react'
import { Button, Icon, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import MainColors from '../constants/MainColors'
import MainLayout from '../constants/MainLayout'

export default ({ iconType, isChecked, isDisabled, firstText, secondText, OnFirstClick, OnSecondClick, iconName }) => {
  const itemSizeLevel = 68
  const styles = StyleSheet.create({
    normalButtonStyle: {
      backgroundColor: MainColors.fillBright,
      width: itemSizeLevel,
      height: itemSizeLevel,
      margin: 10
    },
    inverseButtonStyle: {
      backgroundColor: isDisabled ? MainColors.textHolder : MainColors.facebookBlue,
      width: itemSizeLevel,
      height: itemSizeLevel,
      margin: 10
    },
    textValue: {
      textAlign: 'center',
      color: isDisabled ? MainColors.textHolder : MainColors.facebookBlue,
      fontSize: 12
    }
  })

  return (
    <View>
      {!isChecked &&
        <>
          <Button rounded onPress={OnFirstClick} disabled={isDisabled} style={styles.normalButtonStyle}>
            <Icon type={iconType || 'FontAwesome5'} name={iconName} style={{ color: isDisabled ? MainColors.textHolder : MainColors.facebookBlue, fontSize: MainLayout.iconMore }} />
          </Button>
          <Text style={styles.textValue}>{firstText}</Text>
        </>}
      {isChecked &&
        <>
          <Button rounded onPress={OnSecondClick} disabled={isDisabled} style={styles.inverseButtonStyle}>
            <Icon type={iconType || 'FontAwesome5'} solid name={iconName} style={{ color: MainColors.fillBright, fontSize: MainLayout.iconMore }} />
          </Button>
          <Text style={styles.textValue}>{secondText}</Text>
        </>}
    </View>
  )
}
