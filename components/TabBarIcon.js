import * as React from 'react'
import MainColors from '../constants/MainColors'
import { Image, StyleSheet } from 'react-native'

export default props => {
  const useStyles = StyleSheet.create({
    iconDisplay: {
      marginBottom: -5,
      width: 20,
      height: 20,
      tintColor: props.focused ? MainColors.primary : MainColors.textHolder
    }
  })

  return (
    <Image
      source={props.uri}
      style={useStyles.iconDisplay}
    />)
}
