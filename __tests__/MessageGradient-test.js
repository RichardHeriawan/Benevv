/* global test, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import MessageGradient from '../components/MessageGradient'

test('renders correctly', () => {
  const renderTree = renderer.create(<MessageGradient />)
  expect(renderTree).toEqual(expect.anything())
})
