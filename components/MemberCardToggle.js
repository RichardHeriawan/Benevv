import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon, Text, View } from 'native-base'
import MainColors from '../constants/MainColors'
import UserPhoto from './UserPhoto'
import MainLayout from '../constants/MainLayout'
import { isClear } from './index'

// Check also link 2020111313
export default props => {
  const verticalLevel = 4
  const primaryLevel = 10
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        borderRadius: MainLayout.tileRadius,
        backgroundColor: props.isSelected ? MainColors.fillBright : undefined,
        paddingVertical: verticalLevel,
        paddingHorizontal: primaryLevel
      }}
    >
      <UserPhoto avatarUrl={props.imageUrl} />{/* TODO use thumbnail */}
      <View style={{ flex: 1, marginLeft: primaryLevel }}>
        <Text ellipsizeMode='tail' numberOfLines={2}>{props.memberName}</Text>
        {!isClear(props.memberSubtitle) && <Text style={{ color: MainColors.subTitle }}>{props.memberSubtitle}</Text>}
      </View>
      <Icon
        type='FontAwesome5' name='check' style={{
          marginLeft: primaryLevel,
          color: props.isSelected ? MainColors.primary : MainColors.fillBright
        }}
      />
    </TouchableOpacity>)
}
