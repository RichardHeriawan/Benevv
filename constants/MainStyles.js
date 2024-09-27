import MainColors from './MainColors'
import { StyleSheet, Dimensions } from 'react-native'
import MainLayout from './MainLayout'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height
const primaryLevel = 10

export default StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: MainColors.cleanWhite
  },
  errorMessage: {
    color: MainColors.primary,
    marginHorizontal:15,

  },
  addressButtonContainer: {
    flexDirection: 'row-reverse'
  },
  anchorAllSides: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  linkAddress: {
    color: MainColors.facebookBlue,
    textDecorationLine: 'underline'
  },
  // Check also link 2020060501
  backImage: {
    backgroundColor: MainColors.fillBright,
    flex: 1,
    resizeMode: 'cover'
  },
  clickSection: {
    marginTop: 10,
    padding: primaryLevel,
    borderRadius: MainLayout.tileRadius,
    backgroundColor: MainColors.fillBright
  },
  messageArea: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: MainColors.fillBright,
    borderRadius: MainLayout.tileRadius
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 32,
    height: 32,
    backgroundColor: MainColors.primary
  },
  bottomButtonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: primaryLevel
  },
  textLabel: {
    textTransform: 'uppercase'
  },
  appTextItem: {
    borderBottomColor: MainColors.fillBright,
    borderBottomWidth: 1
  },
  errorScreen: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
