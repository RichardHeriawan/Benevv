/* global test, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import AttendButton from '../components/AttendButton'

test('renders correctly', () => {
  const renderTree = renderer.create(
    <AttendButton
      isChecked
      isDisabled={false}
      firstText='Attend'
      secondText='Attending'
      OnFirstClick={() => {}}
      OnSecondClick={() => {}}
    />)
  expect(renderTree).toEqual(expect.anything())
})
