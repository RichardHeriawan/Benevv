import { DefaultTheme } from '@react-navigation/native'
import MainColors from './MainColors'

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: MainColors.primary
  }
}
