import { Text } from 'native-base'
import MainColors from '../constants/MainColors'
import React from 'react'

export default ({ children }) => {
  return (
    <Text style={{
      fontSize: 18,
      color: MainColors.groupText,
      marginTop: 28,
      marginBottom: 28
    }}
    >
      {children}
    </Text>)
}
