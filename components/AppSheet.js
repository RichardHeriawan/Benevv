import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { height } from '../constants/MainStyles'

export default ({ children, refSheet }) =>
  <RBSheet
    ref={refSheet}
    height={height - 50}
    closeOnPressBack={false}
    closeOnPressMask={false}
    customStyles={{
      container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }
    }}
    // https://www.npmjs.com/package/react-native-raw-bottom-sheet
    keyboardAvoidingViewEnabled={false}
  >
    {children}
  </RBSheet>
