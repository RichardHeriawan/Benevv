import React from 'react'
import { Code } from 'react-content-loader/native'
import { SafeAreaView } from 'react-native'
import MainColors from '../constants/MainColors'

const primaryLevel = 10
const codeLevel = 11
const speedSeconds = 0.7

export default ({ isLoading, children }) =>
  <>
    {isLoading &&
      <SafeAreaView style={{ flex: 1, backgroundColor: MainColors.cleanWhite, padding: primaryLevel }}>
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
        <Code
          style={{ marginBottom: codeLevel }}
          foregroundColor={MainColors.fillBright}
          speed={speedSeconds} interval={0}
        />
      </SafeAreaView>}
    {!isLoading && children}
  </>
