import MainStyles from '../constants/MainStyles'
import { Icon } from 'native-base'
import MainColors from '../constants/MainColors'
import MainLayout from '../constants/MainLayout'
import { View } from 'react-native'
import React from 'react'

export default () =>
  <View style={{
    ...MainStyles.iconContainer,
    bottom: 0,
    right: 0,
    position: 'absolute'
  }}
  >
    <Icon
      type='FontAwesome5' name='camera'
      style={{ color: MainColors.cleanWhite, fontSize: MainLayout.iconMedium }}
    />
  </View>
