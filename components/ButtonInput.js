import MainStyles from '../constants/MainStyles'
import { Input, Item, Label, Text, Icon } from 'native-base'
import MainColors from '../constants/MainColors'
import React from 'react'

const bigSize = 16
const smallSize = 12

// Check also link 2020110520
// Because Item is a TouchableOpacity, impossible to have click feedback
export default ({ onPress, fieldValue, isRequired, fieldLabel, hasValue, OnPressCheck }) =>
  <Item
    style={MainStyles.appTextItem}
    floatingLabel
    onPress={onPress}
  >
    <Label style={[
      { fontSize: hasValue ? smallSize : bigSize },
      MainStyles.textLabel]}
    >
      {fieldLabel}
      {isRequired && <Text style={MainStyles.errorMessage}> *</Text>}

    </Label>
    {hasValue &&
      <Icon
        type='Ionicons'
        name='ios-remove-circle-outline'
        style={{ color: MainColors.primary }}
        onPress={() => {
          OnPressCheck([]) // To blank the location field
        }}
      />}
    {/* Disable touch events on Input https://stackoverflow.com/a/30553150/6227407 */}
    <Input
      disabled
      pointerEvents='none'
      value={fieldValue}
    />
  </Item>
