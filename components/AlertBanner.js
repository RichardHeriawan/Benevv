import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, View } from 'native-base'
import moment from 'moment'
import MainColors from '../constants/MainColors'
import { isClear } from './index'
import produce from 'immer'

// default position on top
export default ({ positionValue, memoItem, personMessages, eventStartTime, acceptClick, declineClick, isHost }) => {
  const [state, setState] = useState({ isLoading: true })
  useEffect(() => {
    setState(produce((draftState) => {
      draftState.memoTitle = memoItem.title
      draftState.requestType = defineRequestType()
      draftState.isLoading = false
    }))
  }, [])

  const fontSize = 14
  const defineRequestType = () => {
    const requestType = []
    if (!isClear(personMessages) && !isClear(personMessages.part_reason)) requestType.push('Participation/time')
    if (!isClear(personMessages) && !isClear(personMessages.part_goods)) requestType.push('Good or Services')
    if (!isClear(personMessages) && !isClear(personMessages.part_money)) requestType.push('Donation')

    return requestType.join(', ')
  }

  // https://stackoverflow.com/a/55556258
  const currencyFormat = numDate => '$' + numDate.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  const collabDescription = () => {
    return (
      <>
        {!isHost && <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Collaborate on this event?</Text>}
        <Text style={{ marginBottom: 10, fontSize }}>{memoItem.memo_title}</Text>
        {!isClear(state.requestType) &&
          <>
            <Text style={{ flexDirection: 'row', marginBottom: 10, fontSize }}>
              <Text style={{ fontWeight: 'bold' }}>Request Type: </Text>
              {state.requestType}
            </Text>
            <Text style={{ flexDirection: 'row', marginBottom: 10, fontSize }}>
              <Text style={{ fontWeight: 'bold' }}>Request Notes: </Text>
              {!isClear(personMessages) && !isClear(personMessages.part_reason) && personMessages.part_reason}
              {!isClear(personMessages) && !isClear(personMessages.part_goods) && '. ' + personMessages.part_goods + '. '}
              {!isClear(personMessages) && !isClear(personMessages.reason_money) && 'The host has requested for donation of ' + currencyFormat(personMessages.part_money) + '. Reasons:' + personMessages.reason_money}
            </Text>
          </>}
        {!isClear(personMessages) && !isClear(personMessages.part_note) &&
          <Text style={{ flexDirection: 'row', marginBottom: 10, fontSize }}>
            <Text style={{ fontWeight: 'bold' }}>Additional Message: </Text>
            {personMessages.part_note}
          </Text>}
      </>
    )
  }
  if (state.isLoading) {
    return null
  }
  return (
    <View style={[positionValue === 'bottom' ? styles.bottom : styles.top]}>
      {collabDescription()}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {moment.utc(eventStartTime).diff(moment.utc(), 'minutes') > 0 && !isHost &&
          <>
            <Button pilled bordered dark style={{ height: 40 }} onPress={() => acceptClick()}>
              <Text>Accept</Text>
            </Button>
            <Button pilled bordered dark style={{ height: 40 }} onPress={() => declineClick()}>
              <Text>Decline</Text>
            </Button>
          </>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: MainColors.alertBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginHorizontal: -10,
    marginTop: -20
  },
  bottom: {
    borderWidth: 1,
    borderColor: MainColors.fillBright,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    alignItems: 'center'
  }
})
