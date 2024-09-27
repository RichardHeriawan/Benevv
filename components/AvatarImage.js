// Q2020070309
import React, { useState,useEffect } from 'react'
import { Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import MainLayout from '../constants/MainLayout'
import UserPhoto from './UserPhoto'
import { trackAnalytics } from '../lib/analytics/Analytics'
import { useRoute } from '@react-navigation/native'
import store from '../redux/store'

export default props => {
  const allState = store.getState();
  const userInfo = allState.authReducer.userInfo;
  const [isRelatedToYou, setIsRelatedToYou] = useState(false)
  const route = useRoute()

  useEffect(() => {
    if(props.id === userInfo.userId){
      setIsRelatedToYou(true);
    }
    else{
      setIsRelatedToYou(false);
    }
  
  }, [])
  
  return(
    <TouchableOpacity
    style={{ alignItems: 'center', margin: MainLayout.tileMargin }}
    onPress={() => {
      if(props.navigation === undefined){
        return null;
      }
      else{
        trackAnalytics('profileClick', {
          entityId: null,
          entityType: "Profile",
          isRelatedToYou: isRelatedToYou,
          profileId: props.id,
          profileName: props.name,
          pageId: route.key,
          pageName: route.name,
        })
        return props.navigation.push('ProfileDisplay', { userId: props.id });
      }
    }}
  >
    <UserPhoto avatarUrl={props.socialAvatarUrl} style={{ width: 68, height: 68, borderRadius: 68 }} />
    <Text
      style={{ textAlign: 'center', fontSize: 11, width: 60, marginTop: 4 }}
      numberOfLines={2} ellipsizeMode='tail'
    >
      {props.name}
    </Text>
    {(props.amount != null)
      ? <Text
          style={{ textAlign: 'center', fontSize: 11, width: 60, marginTop: 4 }}
          numberOfLines={1} ellipsizeMode='tail'
        >
          ${props.amount}
        </Text>
    : <></>
    }
    

  </TouchableOpacity>)
}