import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import 'intl'
import 'intl/locale-data/jsonp/en'
import * as CampaignServiceApi from '../apis/CampaignServiceApi'

function Progress (props) {
  // gets the total raised and goal of a campaign
  const { totalRaised, goal } = props

  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      delay: 5000
    }), {
      iterations: 'infinite',
      resetBeforeIteration: true
    }).start()
  }, [])

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [`0%`, `100%`],
    extrapolate: 'clamp'
  })

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,196,205)', 'rgb(255,45,85)'],
  })

  const progressAnimationStyle = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: colorInterpolate
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  // if goal is above 100%, then make it 100%, otherwise use the normal percentage that is between 0-100%
  const widthBarStyle = {
    width: `${(totalRaised / goal * 100) > 100 ? 100 : (totalRaised / goal * 100)}%`
  }

  return (
    <>
      <View style={styles.campaignRaisedText}>
        <Text> Raised: {formatter.format(totalRaised / 100)}</Text>
        <Text> Goal: {formatter.format(goal / 100)}</Text>
      </View>
      <View style={styles.backgroundProgressBar}>
        <View style={[widthBarStyle, styles.progressAnimationBackground]}>
          <Animated.View style={[styles.progressAnimation, progressAnimationStyle]}/>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  campaignRaisedText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  backgroundProgressBar: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(255,45,85,0.3)'
  },
  progressAnimationBackground: {
    justifyContent: 'center',
    height: 15,
    backgroundColor: '#FF2D55',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressAnimation: {
    height: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 20,
  }
})

export default Progress
