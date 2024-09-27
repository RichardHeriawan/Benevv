import React from 'react'
import { Text } from 'native-base'
import MainColors from '../constants/MainColors'

const headLevel = 20
const mediumHeader = 20
const LargeHeader = 30

export default props => {
  if (props.medium) {
    return (
      <Text style={{ ...(props.noMargin ? { } : { marginTop: headLevel }), fontSize: mediumHeader, color: MainColors.subTitle, fontWeight: 'bold' }}>
        {props.children}
      </Text>)
  }
  if (props.large) {
    return (
      <Text style={{ ...(props.noMargin ? { } : { marginTop: headLevel, marginBottom: 10 }), fontSize: LargeHeader, color: MainColors.subTitle, fontWeight: '500' }}>
        {props.children}
      </Text>)
  }

  return (
    <Text>
      {props.children}
    </Text>)
}
