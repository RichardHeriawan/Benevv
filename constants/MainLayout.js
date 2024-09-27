import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  iconMedium: 15,
  iconMore: 21,
  iconLarge: 25,
  ellipsisIconSize: 32,
  iconExtra: 200, // TODO unused
  iconPlus: 200,
  tileRadius: 12,
  tileMargin: 5
}
