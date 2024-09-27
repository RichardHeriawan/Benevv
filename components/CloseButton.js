import React from 'react'
import { Icon, View } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MainColors from '../constants/MainColors'
import MainLayout from '../constants/MainLayout'

export default ({ OnButtonPress, isDark, style }) => (
  <View style={[{ position: 'absolute', right: 0, zIndex: 3 }, style]}>
    <TouchableOpacity onPress={() => OnButtonPress()} style={[styles.background, isDark ? styles.lightBackgroundColor : styles.darkBackgroundColor]}>
      <Icon
        type='FontAwesome5' name='times' style={[styles.closeIcon, isDark ? undefined : styles.lightIcon]}
      />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  background: {
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  closeIcon: {
    fontSize: MainLayout.iconMedium,
    marginTop: 1
  },
  lightBackgroundColor: {
    backgroundColor: MainColors.textHolder
  },
  darkBackgroundColor: {
    backgroundColor: MainColors.subTitle
  },
  lightIcon: {
    color: MainColors.cleanWhite
  }
})
