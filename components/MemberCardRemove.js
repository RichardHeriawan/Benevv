import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, Text, View } from 'native-base'
import MainColors from '../constants/MainColors'

// Check also link 2020111313
export default props => {
  const primaryLevel = 10
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: primaryLevel
      }}
    >
      <View style={{ flex: 1  ,marginLeft: primaryLevel}}>
        <Text style={{fontWeight: 'bold'}} ellipsizeMode='tail' numberOfLines={2}>{props.memberName}</Text>
      </View>
      <TouchableOpacity onPress={props.onPress}>
        <Icon type='Ionicons' name='ios-remove-circle-outline' style={{ marginLeft: primaryLevel, color: MainColors.primary }} />
      </TouchableOpacity>
    </View>)
}
