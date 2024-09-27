import React from 'react'
import { Thumbnail } from 'native-base'
import { isClear } from './index'
import MainColors from '../constants/MainColors'

export default props =>
  <Thumbnail
    {...props}
    style={{ ...props.style, backgroundColor: MainColors.fillBright }}
    source={!isClear(props.avatarUrl) ? { uri: props.avatarUrl } : require('../assets/images/profile.png')}
  />
