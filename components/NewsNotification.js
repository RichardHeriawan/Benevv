import { useState, useEffect } from 'react'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import MainColors from '../constants/MainColors'
import { Alert } from 'react-native'

export default props => {
  const [state, setState] = useState({ isExpired: false })

  Notifications.createCategoryAsync('announcementBanner', [
    {
      actionId: 'knowMore',
      buttonTitle: 'I want to know more!',
      isDestructive: false,
      isAuthenticationRequired: false
    }
  ])

  if (Constants.platform.android) {
    Notifications.createChannelAndroidAsync('androidChannel', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250]
    })
  }

  useEffect(() => {
    Notifications.addListener(
      handleNotification
    )
  }, [])

  const handleNotification = notification => {
    if (notification.actionId === 'knowMore') {
      setState({ isExpired: true })
      Alert.alert('You will get more news about this topic.')
    }
  }

  const localNotification = {
    title: props.title,
    body: props.description,
    categoryId: 'announcementBanner',
    ios: {
      sound: true
    },
    android:
        {
          channelId: 'androidChannel',
          sound: true,
          color: MainColors.cleanBlack,
          priority: 'max',
          sticky: false,
          vibrate: true,
          icon: 'https://raw.githubusercontent.com/smarttwigs/benevv/development/assets/images/benevvLogo.png?token=AHI5ZY3N7IBBAQSEL2CC7Z26ZQY2M'
        }
  }

  if (!state.isExpired) {
    Notifications.presentLocalNotificationAsync(localNotification)
  }
  return null
}
