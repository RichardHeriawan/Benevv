import React, { useState, useEffect } from 'react'
import { isClear } from './index'
import moment from 'moment'
import produce from 'immer'
import ToggleButton from './ToggleButton'

export default props => {
  const [state, setState] = useState({ displayButton: true })
  useEffect(() => {
    if (!isClear(props.eventStartTime)) {
      setState(produce(draftState => {
        draftState.displayButton = (moment.utc() < moment.utc(props.eventEndTime))
      }))
    }
  }, [])
  // if host don't show the attend button on event card
  if (!props.isHost) {
    if (state.displayButton) {
      return <ToggleButton {...props} />
    } else {
      return null
    }
  } else {
    return null
  }
}
