import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'
import MainColors from '../constants/MainColors'
import ChevronRightIcon from './ChevronRightIcon'
import MainStyles from '../constants/MainStyles'
import { UserKind } from './index'
import UserPhoto from './UserPhoto'

// Check also link 2020111313
export default props => {
  const primaryLevel = 10

  // BNV-333 Yuri Dubler 12/11/2020
  // Banner Behavior: If the host presses on the current collaborator more than once, toggle the display of the Banner
  // If the host presses a different collaborator than currently selected, keep the banner open
  function setBannerDisplayBoolean () {
    props.setShowCollabBanner(props.id === props.bannerCollabId ? !props.showCollabBanner : true)
    props.setBannerCollabId(props.id)
  }

  // BNV-333: The <TouchableOpacity>'s onPress handler has been updated to do the following:
  // 1) When a Host user presses on a Collaborator's <CollabCard>, toggle the expanding/contracting Collaborator Banner
  // 2) When a non-Host user presses on a Collaborator's <CollabCard>, navigate to the Collaborator's profile
  return (
    <TouchableOpacity
      onPress={() => props.isHost ? setBannerDisplayBoolean() : props.navigation.push('ProfileDisplay', { userId: props.id })}
      style={{
        ...MainStyles.clickSection,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: primaryLevel
      }}
    >
      <UserPhoto avatarUrl={props.uri} />
      <View style={{ flex: 1, flexDirection: 'column', marginLeft: primaryLevel }}>
        <Text ellipsizeMode='tail' numberOfLines={1}>{props.name}</Text>
        <Text style={{ color: MainColors.subTitle }}>{UserKind(props.user_type)}</Text>
      </View>
      {props.isHost ? null : <ChevronRightIcon marginLeft={primaryLevel} />}
    </TouchableOpacity>
  )
}
