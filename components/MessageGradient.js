import { LinearGradient } from 'expo-linear-gradient'
import MainStyles from '../constants/MainStyles'
import React from 'react'

export default () => (
  <LinearGradient
    colors={['#FF9A58', '#FE2F67', '#7431D7']}
    start={[1, 0.1]}
    end={[-0.3, 0.25]}
    style={MainStyles.anchorAllSides}
  />)
