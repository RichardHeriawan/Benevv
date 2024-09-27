import { Alert } from 'react-native'

export default ({ title, message, optionTwoText, optionTwoBehavior }) => (
  Alert.alert(
    `${title}`,
    `${message}`,
    [
      {
        text: 'Cancel',
        style: 'destructive'
      },
      {
        text: `${optionTwoText}`,
        onPress: () => optionTwoBehavior()
      }
    ]
  )
)
