import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import MainColors from '../constants/MainColors'
import { isClear } from './index'
import MainLayout from '../constants/MainLayout'

export default ({ marginLeft, expanded }) => (
  <Icon
    type='FontAwesome5' name={!expanded || isClear(expanded) ? 'chevron-right' : 'chevron-down'}
    style={isClear(marginLeft) ? styles.arrowIcon : { ...styles.arrowIcon, marginLeft }}
  />
)

const styles = StyleSheet.create({
  arrowIcon: {
    color: MainColors.primary,
    fontSize: MainLayout.iconMedium
  }
})
