import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'
import produce from 'immer'
import MainColors from '../constants/MainColors'

export default props => {
  const [state, setState] = useState({ changedText: '' })

  const UpdateSearch = (changedText) => {
    setState(produce((draftState) => {
      draftState.changedText = changedText
    }))
    props.onChangeText(changedText)
  }

  return (
    <SearchBar
      placeholder='Search'
      onChangeText={UpdateSearch}
      value={state.changedText}
      platform='ios'
      containerStyle={{ marginHorizontal: -8, marginVertical: props.negativeMargins ? -12 : undefined }}
      cancelButtonProps={{ color: MainColors.primary }}
    />)
}
