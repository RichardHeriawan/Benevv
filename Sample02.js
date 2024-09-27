import React, { useState } from 'react'
import produce from 'immer'
import { TouchableOpacity, Button, Text } from 'react-native'

export default () => {
  const [state, setState] = useState({ flag: 0, loginCount: 0 })
  return (
    <>
      <Text style={{ marginTop: 100 }}>{'The login button was clicked '}{state.loginCount}{' times'}</Text>
      <Button
        title={'Flag ' + state.flag}
        onPress={() => setState(produce((draftState) => { draftState.flag = draftState.flag + 1 }))}
      />

      {state.flag === 0 &&
        <Button
          title='Login' accessibilityLabel='Login'
          onPress={() => setState(produce((draftState) => { draftState.loginCount = draftState.loginCount + 1 }))}
        >
          <Text>Login</Text>
        </Button>}
      {state.flag === 1 &&
        <Button
          title='Log-in' accessibilityLabel='Log-in'
          onPress={() => setState(produce((draftState) => { draftState.loginCount = draftState.loginCount + 1 }))}
        >
          <Text>Log-in</Text>
        </Button>}
      {state.flag >= 2 &&
        <TouchableOpacity
          accessibilityLabel='Log-in'
          onPress={() => setState(produce((draftState) => { draftState.loginCount = draftState.loginCount + 1 }))}
        >
          <Text>Log-in</Text>
        </TouchableOpacity>}
    </>)
}
