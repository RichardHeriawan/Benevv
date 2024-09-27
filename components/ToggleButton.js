import React from 'react'
import { Button, Text } from 'native-base'
import MainColors from '../constants/MainColors'

export default ({ isChecked, isDisabled, firstText, secondText, OnFirstClick, OnSecondClick }) => {
  return (
    <>
      {!isChecked &&
        <Button pilled onPress={OnFirstClick} disabled={isDisabled}>
          <Text>{firstText}</Text>
        </Button>}
      {isChecked &&
        <Button pilled onPress={OnSecondClick} disabled={isDisabled} style={{ backgroundColor: MainColors.cleanWhite }}>
          <Text style={isDisabled ? { color: MainColors.textHolder } : { color: MainColors.primary }}>
            {secondText}
          </Text>
        </Button>}
    </>)
}
