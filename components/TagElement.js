import React from 'react'
import { Text } from 'native-base'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MainColors from '../constants/MainColors'

export default ({ titleValue, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.elementContainer}
    >
      <Text style={styles.elementText}>{titleValue}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  elementText: {
    fontSize: 14
  },
  elementContainer: {
    backgroundColor: MainColors.selectedTag,
    borderRadius: 4,
    padding: 6,
    margin: 3,
    justifyContent: 'center'
  }
})
