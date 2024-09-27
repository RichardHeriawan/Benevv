import { Alert } from 'react-native'

export default ({ title, message, optionTwoText, optionTwoBehavior, optionThreeText, optionThreeBehavior }) => (
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
      },
      {
        text: `${optionThreeText}`,
        onPress: () => optionThreeBehavior()
      }
    ]
  )
)
